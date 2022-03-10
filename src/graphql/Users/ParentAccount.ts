// Get Parent Account by User ID, Username, Email
import { objectType, extendType, nonNull, stringArg, intArg } from "nexus";

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
  },
});
