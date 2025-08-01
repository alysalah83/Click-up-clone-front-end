export async function validateToken(token: string) {
  try {
    const response = await fetch(`${process.env.API_URL}/users/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.ok;
  } catch (error) {
    console.error("Token validation failed:", error);
    return false;
  }
}
