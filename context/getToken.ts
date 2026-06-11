export default function getToken() {
  if (typeof window !== "undefined") {
    const local = localStorage.getItem("token");
    if (local) {
      const { value, createdAt } = JSON.parse(local);
      return value;
    }
  }
  return null;
}
