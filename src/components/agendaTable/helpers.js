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
    case "PegaWORLD":
      return "pi-pegasus"
    case "Breaks & Meals":
      return "pi-cuppa"
    default:
      break;
  }
}
export function categoryClassHelper(category) {
  console.log(category)

  switch (category) {
    case "Mobile":
      return "mobile";
    case "Customer Centricity":
      return "centricity";
    case "User Centered Design":
      return "ucd";
    case "Travel & Registration":
      return "travel-registration";
    case "Breaks & Meals":
      return "breaks-meals";
    case "Special Events":
      return "special-events";
    case "PegaWORLD":
      return "pegaworld";
    default:
      break;
  }
}