const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

function sanitizeBody(body: string): string {
  const trimmed = body.trim();
  if (trimmed.length > 500) return trimmed.slice(0, 500) + "...[truncated]";
  return trimmed;
}

function tryParseJson(text: string): Record<string, unknown> | null {
  try {
    const parsed = JSON.parse(text);
    if (typeof parsed === "object" && parsed !== null) {
      return parsed as Record<string, unknown>;
    }
    return null;
  } catch {
    return null;
  }
}

function getStringField(
  data: Record<string, unknown>,
  ...keys: string[]
): string | null {
  for (const key of keys) {
    const val = data[key];
    if (typeof val === "string" && val.trim() !== "") return val;
  }
  return null;
}

// --- Signed token for passing credentials from POST to GET redirect step ---
// Token format: base64url(payload).base64url(hmac_sha256(payload, key))
// Payload is JSON: { c, l, p, exp }  (companyCode, loginId, password, expiry)

function base64urlEncode(str: string): string {
  return btoa(str)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64urlDecode(str: string): string {
  let s = str.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  return atob(s);
}

async function hmacSha256(key: string, message: string): Promise<string> {
  const encoder = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    cryptoKey,
    encoder.encode(message)
  );
  const bytes = new Uint8Array(signature);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function getSigningKey(): string {
  return Deno.env.get("SUPABASE_ANON_KEY") || "crm-login-fallback-key";
}

async function createLaunchToken(
  companyCode: string,
  loginId: string,
  password: string
): Promise<string> {
  const payload = JSON.stringify({
    c: companyCode,
    l: loginId,
    p: password,
    exp: Date.now() + 30_000, // 30-second expiry
  });
  const encodedPayload = base64urlEncode(payload);
  const signature = await hmacSha256(getSigningKey(), encodedPayload);
  return `${encodedPayload}.${signature}`;
}

async function validateLaunchToken(
  token: string
): Promise<{ companyCode: string; loginId: string; password: string } | null> {
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [encodedPayload, signature] = parts;
  const expectedSignature = await hmacSha256(getSigningKey(), encodedPayload);
  if (signature !== expectedSignature) return null;

  try {
    const payload = JSON.parse(base64urlDecode(encodedPayload));
    if (Date.now() > payload.exp) return null;
    if (!payload.c || !payload.l || !payload.p) return null;
    return {
      companyCode: payload.c,
      loginId: payload.l,
      password: payload.p,
    };
  } catch {
    return null;
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  const requestUrl = new URL(req.url);

  // --- GET: Launch redirect step ---
  // Browser navigates here with a signed token; we validate it and
  // return a 302 redirect to the Salesnayak LoginNow URL so that
  // Salesnayak sets session cookies directly in the user's browser.
  if (req.method === "GET" && requestUrl.searchParams.has("launch")) {
    const token = requestUrl.searchParams.get("launch")!;
    const creds = await validateLaunchToken(token);

    if (!creds) {
      return new Response(
        JSON.stringify({
          status: 0,
          message: "Login session expired or invalid. Please try again.",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const loginUrl = `https://salesnayak.com/API/LoginNow?CompanyCode=${encodeURIComponent(
      creds.companyCode
    )}&loginid=${encodeURIComponent(creds.loginId)}&password=${encodeURIComponent(
      creds.password
    )}&Type=1`;

    // Return 302 redirect so the browser navigates directly to Salesnayak,
    // which sets session cookies in the browser and redirects to the CRM.
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        Location: loginUrl,
      },
    });
  }

  // --- POST: Credential verification step ---
  try {
    const body = await req.json();
    const companyCode = body.companyCode;
    const loginId = body.loginId;
    const password = body.password;

    if (!companyCode || !loginId || !password) {
      return new Response(
        JSON.stringify({ status: 0, message: "Missing required fields." }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Step 1: VerifyCredential
    const verifyUrl = `https://salesnayak.com/API/VerifyCredential?CompanyCode=${encodeURIComponent(
      companyCode
    )}&loginid=${encodeURIComponent(loginId)}&password=${encodeURIComponent(password)}`;

    const verifyResponse = await fetch(verifyUrl, {
      method: "GET",
      headers: { Accept: "application/json, text/plain, */*" },
    });

    const verifyText = await verifyResponse.text();
    const verifyContentType =
      verifyResponse.headers.get("content-type") || "";

    console.log("VerifyCredential response:", {
      httpStatus: verifyResponse.status,
      contentType: verifyContentType,
      body: sanitizeBody(verifyText),
    });

    if (!verifyText || verifyText.trim() === "") {
      return new Response(
        JSON.stringify({
          status: 0,
          message: "CRM verification returned an empty response.",
        }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const verifyData = tryParseJson(verifyText);

    if (verifyData) {
      const verifyStatus = Number(
        verifyData.Status ?? verifyData.status ?? 0
      );

      if (verifyStatus !== 1) {
        const failMsg =
          getStringField(verifyData, "Message", "message") ||
          "Invalid CRM credentials.";
        return new Response(
          JSON.stringify({ status: 0, message: failMsg }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    } else {
      const textLower = verifyText.trim().toLowerCase();
      if (
        textLower === "0" ||
        textLower === "false" ||
        textLower.includes("status=0") ||
        textLower.includes("invalid")
      ) {
        return new Response(
          JSON.stringify({
            status: 0,
            message: "Invalid CRM credentials.",
          }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (
        textLower !== "1" &&
        textLower !== "true" &&
        !textLower.includes("status=1") &&
        !textLower.includes("valid")
      ) {
        return new Response(
          JSON.stringify({
            status: 0,
            message:
              "Unable to verify CRM credentials. Unexpected response format from verification API.",
            rawResponse: sanitizeBody(verifyText),
            httpStatus: verifyResponse.status,
            contentType: verifyContentType,
          }),
          {
            status: 502,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    }

    // Step 2: Credentials verified — create a signed launch token
    // The browser will navigate to the launch URL, which returns a 302
    // redirect to the Salesnayak LoginNow URL. This ensures Salesnayak
    // sets session cookies directly in the user's browser.
    const token = await createLaunchToken(companyCode, loginId, password);

    const baseUrl = `${requestUrl.protocol}//${requestUrl.host}`;
    const launchUrl = `${baseUrl}/functions/v1/crm-login?launch=${token}`;

    return new Response(
      JSON.stringify({ status: 1, launchUrl }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.log(
      "crm-login edge function error:",
      err instanceof Error ? err.message : "Unknown error"
    );
    return new Response(
      JSON.stringify({
        status: 0,
        message: "Unable to connect to CRM. Please try again later.",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
