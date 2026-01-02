const API_URL = "http://localhost:3000/restaurants";

export async function fetchRestaurants() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("식당 목록 조회 실패");
  return res.json();
}

export async function createRestaurant(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("식당 추가 실패");
  return res.json();
}
