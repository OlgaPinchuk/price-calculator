describe("Price calculator", function () {
  const testData = [
    ["private", "new", 100, new Date(), 115],
    ["private", "new", 100, new Date("2022-03-01"), 125],
    ["private", "new", 100, new Date("2022-10-01"), 125],
    ["private", "existing", 100, new Date(), 135],
    ["private", "existing", 100, new Date("2022-03-01"), 135],
    ["private", "existing", 100, new Date("2022-10-01"), 135],
    ["corporate", "existing", 100, new Date(), 130],
    ["corporate", "existing", 100, new Date("2022-03-01"), 130],
    ["corporate", "existing", 100, new Date("2022-10-01"), 130],
    ["corporate", "new", 100, new Date(), 110],
    ["corporate", "new", 100, new Date("2022-03-01"), 120],
    ["corporate", "new", 100, new Date("2022-10-01"), 120],
    ["not existing", "new", 100, new Date(), 0],
    ["private", "not existing", 100, new Date(), 0],
  ];

  for (const [userType, productType, price, date, expected] of testData) {
    it(`Results into ${expected} with ${userType} user, ${productType} product, ${price}, ${date}`, function () {
      const actual = calculatePrice(userType, productType, price, date);
      expect(actual).to.equal(expected);
    });
  }
});

describe("Searching a new item by type", function () {
  const items = [
    {
      type: "private",
      discount: 0,
    },
    {
      type: "corporate",
      discount: 5,
    },
    {
      type: "other",
      discount: 15,
    },
  ];
  const testData = [
    [items, "private", "private"],
    [items, "corporate", "corporate"],
    [items, "other", "other"],
    [items, "not existing", undefined],
  ];

  for (const [items, itemType, expected] of testData) {
    it(`Results into ${expected} type with ${itemType} parameter`, function () {
      const actual = findItemByType(items, itemType)?.type;
      expect(actual).to.equal(expected);
    });
  }
});

describe("The new product validation", function () {
  it("Results into true if the passed parameter equals to `new`", () => {
    const actual = checkIfNewProduct("new");
    expect(actual).to.be.true;
  });
  it("Results into false if the passed parameter do not equal to `new`", () => {
    const actual = checkIfNewProduct("default");
    expect(actual).to.be.false;
  });
});

describe("The new date validation", function () {
  it("Results into true if the passed date is today", () => {
    const actual = checkIfDateToday(new Date());
    expect(actual).to.be.true;
  });
  it("Results into false if the passed date is not to today", () => {
    const actual = checkIfDateToday(new Date("2022-03-01"));
    expect(actual).to.be.false;
  });
});
