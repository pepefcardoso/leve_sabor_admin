// Função pura para autenticação, facilitando o teste unitário
export async function authenticateUser(email: string, password: string, apiUrl: string) {
  const laravelResponse = await fetch(apiUrl + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!laravelResponse.ok) {
    const errorData = await laravelResponse.json();
    return { success: false, error: errorData.message || "Falha no login" };
  }

  const data = await laravelResponse.json();
  const token = data.token;
  if (!token) {
    return { success: false, error: "Token de autenticação não foi reconhecido" };
  }
  return { success: true, token, user: data.user };
}

// Função pura para refresh token
export async function handleRefreshToken(refreshToken: string) {
  // TODO: implementar validação real do refreshToken e geração de novo accessToken
  // Exemplo fictício:
  if (!refreshToken || refreshToken === "invalid") {
    return { error: "Refresh token inválido.", status: 401 };
  }
  // Aqui você buscaria o usuário e geraria novo token
  const newAccessToken = "novo_token_jwt";
  return { accessToken: newAccessToken };
}

// Função pura para logout remoto
export async function handleLogoutRemoto(token: string | undefined, apiUrl: string) {
  if (!token) return { success: true };
  try {
    await fetch(apiUrl + "/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

// Função pura para obter token do cookie
export function handleGetToken(token: string | undefined) {
  return { token: token || null };
}

// Função pura para checar autenticação
export function handleCheckAuth(token: string | undefined) {
  return { isAuthenticated: !!token };
}

// Função pura para gerar CSRF token
export function handleCsrfToken(csrfToken: string) {
  return { csrfToken };
}
