// Get Parent Account by User ID, Username, Email
import {
  objectType,
  extendType,
  nonNull,
  stringArg,
  intArg,
  inputObjectType,
  enumType,
} from "nexus";

export const ParentAccount = objectType({
  name: "ParentAccount",
  definition(t) {
    t.nonNull.int("userId");
    t.nonNull.string("username");
    t.string("createdAt");
    t.nonNull.string("status");
    t.nonNull.string("package");
  },
});

export const ParentAccountMinimal = objectType({
  name: "ParentAccountMinimal",
  definition(t) {
    t.nonNull.int("userId");
    t.nonNull.string("username");
    t.string("createdAt");
  },
});

export const PageInfo = objectType({
  name: "PageInfo",
  definition(t) {
    t.string("afterKey");
    t.string("beforeKey");
  },
});

const UserStatus = enumType({
  name: "UserStatus",
  members: [
    "Active",
    "ComplianceBanned",
    "ComplianceDeactivated",
    "ComplianceSuspended",
    "ComplianceWarned",
    "SoftDelete",
    "ProvisionFail",
    "ProvisionPermfail",
    "ProvisionNeeded",
    "ProfileUpdated",
    "IncompleteProfile",
    "ProvisionPending",
    "BillingWarned",
    "BillingFrozen",
    "BillingTerminated",
    "UpgradeReview",
    "NA",
  ],
  description: "User status types such as Active, Billing Frozen, etc.",
});

export const ParentAccountsSearchData = objectType({
  name: "ParentAccountsSearchData",
  description:
    "Parent account search row data such as userId, username, status, etc.",
  definition(t) {
    t.nonNull.int("userId");
    t.nonNull.string("username");
    t.nonNull.string("package");
    t.nonNull.field("status", {
      type: UserStatus,
    });
    t.string("createdAt");
  },
});

export const ParentAccountsSearchResult = objectType({
  name: "ParentAccountsSearchResult",
  description:
    "Parent account search result data i.e. list of matched parent accounts and page info",
  definition(t) {
    t.nonNull.list.nonNull.field("data", {
      type: "ParentAccountsSearchData",
    });
    t.nonNull.field("pageInfo", {
      type: "PageInfo",
    });
  },
});

export const ParentAccountsSearch = objectType({
  name: "ParentAccountsSearch",
  description: "Parent account search result with data and pageInfo",
  definition(t) {
    t.nonNull.field("result", {
      type: "ParentAccountsSearchResult",
    });
  },
});

export const ParentAccountsSearchInput = inputObjectType({
  name: "ParentAccountsSearchInput",
  description:
    "Parent account search input i.e by userId, email, username, pagination",
  definition(t) {
    t.int("userId");
    t.string("email");
    t.string("username");
    t.int("limit");
    t.string("afterKey");
    t.string("beforeKey");
  },
});

export const ParentAccountQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("parentAccounts", {
      type: "ParentAccount",
      args: {
        userId: intArg(),
        username: stringArg(),
        email: stringArg(),
      },
      async resolve(parent, args, context) {
        const data = await context.repositories.user.getParentAccounts(args);
        console.log("Data: ", data);

        return data.map((ele) => ({
          userId: ele.userId,
          username: ele.username,
          createdAt: ele.createdAt,
          package: ele.package,
          status: ele.active ? "Active" : "Inactive",
        }));
      },
    });

    t.nonNull.list.nonNull.field("parentAccountsMinimal", {
      type: "ParentAccountMinimal",
      async resolve(parent, args, context) {
        const data = await context.repositories.user.getParentAccountsMinimal();
        console.log("Data: ", data);
        return data;
      },
    });

    t.nonNull.field("getParentAccounts", {
      type: "ParentAccountsSearch",
      args: { searchInput: ParentAccountsSearchInput },
      description: "Get parent accounts based on search input",
      async resolve(parent, args, context) {
        console.log("getParentAccounts Args: ", args);
        return {
          result: {
            data: [
              {
                userId: 1,
                username: "user1",
                createdAt: "2022-03-29",
                package: "Pro 100K",
                status: "Active",
              },
            ],
            pageInfo: {
              beforeKey: null,
              afterKey: null,
            },
          },
        };
      },
    });
  },
});

export const SubusersSearchData = objectType({
  name: "SubusersSearchData",
  description:
    "Subuser search row data such as userId, username, parentUserId, status, etc.",
  definition(t) {
    t.nonNull.int("userId");
    t.nonNull.string("username");
    t.nonNull.int("parentUserId");
    t.nonNull.string("parentUsername");
    t.nonNull.field("status", {
      type: UserStatus,
    });
    t.string("createdAt");
  },
});

export const SubusersSearchResult = objectType({
  name: "SubusersSearchResult",
  description:
    "Subuser search result data i.e. list of matched subusers and page info",
  definition(t) {
    t.nonNull.list.nonNull.field("data", {
      type: "SubusersSearchData",
    });
    t.nonNull.field("pageInfo", {
      type: "PageInfo",
    });
  },
});

export const SubusersSearch = objectType({
  name: "SubusersSearch",
  description: "Subuser search result with data and pageInfo",
  definition(t) {
    t.nonNull.field("result", {
      type: "SubusersSearchResult",
    });
  },
});

export const SubusersSearchInput = inputObjectType({
  name: "SubusersSearchInput",
  description:
    "Subuser search input i.e by userId, parentUserId, email, username, pagination",
  definition(t) {
    t.int("userId");
    t.string("email");
    t.string("username");
    t.int("parentUserId");
    t.int("limit");
    t.string("afterKey");
    t.string("beforeKey");
  },
});

export const SubuserQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("getSubusers", {
      type: "SubusersSearch",
      args: { searchInput: SubusersSearchInput },
      description: "Get subusers based on search input",
      async resolve(parent, args, context) {
        console.log("getSubusers Args: ", args);
        return {
          result: {
            data: [
              {
                userId: 1000,
                parentUserId: 1,
                parentUsername: "user1",
                username: "subuser1",
                createdAt: "2022-03-29",
                status: "Active",
              },
            ],
            pageInfo: {
              beforeKey: null,
              afterKey: null,
            },
          },
        };
      },
    });
  },
});

export const TeammatesSearchData = objectType({
  name: "TeammatesSearchData",
  description:
    "Teammate search row data such as parentUserId, parentUsername, username, etc.",
  definition(t) {
    t.nonNull.int("parentUserId");
    t.nonNull.string("parentUsername");
    t.nonNull.string("username");
    t.string("createdAt");
  },
});

export const TeammatesSearchResult = objectType({
  name: "TeammatesSearchResult",
  description:
    "Teammate search result data i.e. list of matched teammates and page info",
  definition(t) {
    t.nonNull.list.nonNull.field("data", {
      type: "TeammatesSearchData",
    });
    t.nonNull.field("pageInfo", {
      type: "PageInfo",
    });
  },
});

export const TeammatesSearch = objectType({
  name: "TeammatesSearch",
  description: "Teammate search result with data and pageInfo",
  definition(t) {
    t.nonNull.field("result", {
      type: "TeammatesSearchResult",
    });
  },
});

export const TeammatesSearchInput = inputObjectType({
  name: "TeammatesSearchInput",
  description:
    "Teammate search input i.e by parentUserId, username, email, pagination",
  definition(t) {
    t.int("userId");
    t.string("email");
    t.string("username");
    t.int("parentUserId");
    t.int("limit");
    t.string("afterKey");
    t.string("beforeKey");
  },
});

export const TeammateQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("getTeammates", {
      type: "TeammatesSearch",
      args: { searchInput: TeammatesSearchInput },
      description: "Get teammates based on search input",
      async resolve(parent, args, context) {
        console.log("getTeammates Args: ", args);
        return {
          result: {
            data: [
              {
                parentUserId: 1,
                parentUsername: "user1",
                username: "teammate1",
                createdAt: "2022-03-29",
              },
            ],
            pageInfo: {
              beforeKey: null,
              afterKey: null,
            },
          },
        };
      },
    });
  },
});

export const UserProfile = objectType({
  name: "UserProfile",
  description:
    "User profile info such as phone and website part of user_profile table",
  definition(t) {
    t.nonNull.string("phone");
    t.nonNull.string("website");
  },
});

export const UserData = objectType({
  name: "UserData",
  description: "User data such as username and email part of user table",
  definition(t) {
    t.nonNull.int("userId");
    t.nonNull.string("username");
    t.nonNull.string("email");
    t.nonNull.boolean("isActive");
    t.int("resellerId");
  },
});

export const UserDetailsInfo = objectType({
  name: "UserDetailsInfo",
  description: "User details info such as user, profile, and status",
  definition(t) {
    t.nonNull.field("user", {
      type: "UserData",
    });

    t.nonNull.field("profile", {
      type: "UserProfile",
    });

    t.nonNull.field("status", {
      type: "UserStatus",
    });
  },
});

export const OfferingsPackage = objectType({
  name: "OfferingsPackage",
  description: "Package information such as displayName, name, and isActive",
  definition(t) {
    t.nonNull.string("displayName");
    t.nonNull.string("name");
    t.nonNull.boolean("isActive");
  },
});

export const OfferingsPackages = objectType({
  name: "OfferingsPackages",
  description: "EI and MC offerings packages",
  definition(t) {
    t.nonNull.field("ei", {
      type: "OfferingsPackage",
    });
    t.nonNull.field("mc", {
      type: "OfferingsPackage",
    });
  },
});

export const OfferingsAddon = objectType({
  name: "OfferingsAddon",
  description:
    "Addon information such as displayName, name, quantity, isActive",
  definition(t) {
    t.nonNull.string("displayName");
    t.nonNull.string("name");
    t.nonNull.int("quantity");
    t.nonNull.boolean("isActive");
  },
});

export const OfferingsDiscount = objectType({
  name: "OfferingsDiscount",
  description: "Discount information such as displayName, name, isActive",
  definition(t) {
    t.nonNull.string("displayName");
    t.nonNull.string("name");
    t.nonNull.boolean("isActive");
  },
});

export const OfferingsFlag = objectType({
  name: "OfferingsFlag",
  description: "Flag information such as name and isActive",
  definition(t) {
    t.nonNull.string("name");
    t.nonNull.boolean("isActive");
  },
});

export const UserDetailsOfferings = objectType({
  name: "UserDetailsOfferings",
  description:
    "User details offerings such as packages, addons, discounts, and flags",
  definition(t) {
    t.nonNull.field("packages", {
      type: "OfferingsPackages",
    });
    t.nonNull.list.nonNull.field("addons", {
      type: "OfferingsAddon",
    });
    t.nonNull.list.nonNull.field("discounts", {
      type: "OfferingsDiscount",
    });
    t.nonNull.list.nonNull.field("flags", {
      type: "OfferingsFlag",
    });
  },
});

export const UserDetailsOfferingsQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getUserOfferings", {
      type: "UserDetailsOfferings",
      description: "Get user offerings based on user ID",
      args: {
        userId: nonNull(intArg()),
      },
      async resolve(parent, args, context) {
        console.log("User Details Offerings resolver args", args);
        return {
          packages: {
            ei: {
              displayName: "EI Pro 1.5M",
              name: "sg.ei.pro-1p5m.v2",
              isActive: true,
            },
            mc: {
              displayName: "MC Free",
              name: "sg.mc.free.v1",
              isActive: true,
            },
          },
          addons: [
            {
              displayName: "SG IPs",
              name: "sg.x.ip.v2",
              quantity: 2,
              isActive: true,
            },
          ],
          discounts: [
            {
              displayName: "Community Development",
              name: "sg.discount.commdev",
              isActive: true,
            },
          ],
          flags: [
            {
              name: "flag.pre-trail.v1",
              isActive: true,
            },
          ],
        };
      },
    });
  },
});

export const UserDetailsInfoQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("getUserInfo", {
      description: "Get user info based on user id",
      type: "UserDetailsInfo",
      args: {
        userId: nonNull(intArg()),
      },
      async resolve(parent, args, context) {
        console.log("User Details Info resolver args", args);
        return {
          user: {
            userId: args.userId,
            username: "user1",
            email: "user1@test.com",
            isActive: true,
            resellerId: null,
          },
          profile: {
            phone: "5555555555",
            website: "user1.com",
          },
          status: "Active",
        };
      },
    });
  },
});
