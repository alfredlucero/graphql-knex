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
    t.string("limit");
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
    "ProvisionFail",
    "ComplianceWarned",
    "ProvisionPermfail",
    "ProvisionNeeded",
    "ProfileUpdated",
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
    t.string("limit");
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
              limit: "10",
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
    t.string("limit");
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
              limit: "10",
              beforeKey: null,
              afterKey: null,
            },
          },
        };
      },
    });
  },
});
