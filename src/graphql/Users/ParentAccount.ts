// Get Parent Account by User ID, Username, Email
import {
  objectType,
  extendType,
  nonNull,
  stringArg,
  intArg,
  inputObjectType,
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
    t.int("limit");
    t.int("afterKey");
    t.int("beforeKey");
  },
});

export const ParentAccountsSearchData = objectType({
  name: "ParentAccountsSearchData",
  definition(t) {
    t.nonNull.int("userId");
    t.nonNull.string("username");
    t.string("createdAt");
  },
});

export const ParentAccountsSearchResult = objectType({
  name: "ParentAccountsSearchResult",
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
  definition(t) {
    t.nonNull.field("result", {
      type: "ParentAccountsSearchResult",
    });
  },
});

export const ParentAccountsSearchInput = inputObjectType({
  name: "ParentAccountsSearchInput",
  definition(t) {
    t.int("limit");
    t.int("userId");
    t.string("email");
    t.string("username");
    t.int("afterKey");
    t.int("beforeKey");
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
      async resolve(parent, args, context) {
        console.log("getParentAccounts Args: ", args);
        return {
          result: {
            data: [
              {
                userId: 1,
                username: "user1",
                createdAt: "2022-03-29",
              },
            ],
            pageInfo: {
              limit: 10,
              beforeKey: null,
              afterKey: null,
            },
          },
        };
      },
    });
  },
});
