export function iconHelper(category) {
  console.log(category)

  switch (category) {
    case "Mobile":
      return "pi-mobile-phone";
    case "Customer Centricity":
      return "pi-archery";
    case "User Centered Design":
      return "pi-layout";
    case "Travel & Registration":
      return "pi-clipboard-data";
    default:
      break;
  }
}