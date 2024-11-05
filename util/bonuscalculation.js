export function bonusCalculation(company, items) {
  var baseBonus = items * 10;
  if (company.rating === "excellent") return baseBonus * 7;
  else if (company.rating === "very good") return baseBonus * 5;
  else if (company.rating === "good") return baseBonus * 3;
  else return baseBonus;
}

export function Company(name, rating) {
  this.name = name;
  this.rating = rating;
}
