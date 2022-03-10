import { NexusGenRootTypes } from "../../nexus-typegen";
import { database } from "../database";

interface ParentAccountFilters {
  userId?: number | null;
  username?: string | null;
  email?: string | null;
}

// SELECT user.id, user.username, user.created_at, user.active, user_profile.is_provision_fail, user_package.package_id, package.name as package_name, COUNT(user_hold.user_id) as user_hold_count
// FROM user
// 	JOIN user_profile
// 		ON user_profile.user_id = user.id
// 	JOIN user_package
// 		ON user_package.user_id = user.id
// 	JOIN package
// 		ON user_package.package_id = package.id
// 	LEFT JOIN user_hold
// 		ON user_hold.user_id = user.id
// WHERE user.reseller_id IS NULL AND user.username LIKE "%mako%"
// GROUP BY user.id
// LIMIT 10 OFFSET 0;

interface ParentAccountDb {
  userId: number;
  username: string;
  createdAt: string | null;
  active: boolean;
  isProvisionFail: number;
  packageId: number;
  package: string;
}

export const UserRepository = {
  async getParentAccountsMinimal(): Promise<
    NexusGenRootTypes["ParentAccountMinimal"][]
  > {
    return database
      .select("id as userId", "username", "created_at as createdAt")
      .from<NexusGenRootTypes["ParentAccountMinimal"]>("user")
      .whereNotNull("username")
      .limit(10)
      .offset(0);
  },
  async getParentAccounts(
    filters: ParentAccountFilters
  ): Promise<ParentAccountDb[]> {
    // SELECT user.id, user.username, user.created_at, user.active, user_profile.is_provision_fail, user_package.package_id, package.name as package_name, COUNT(user_hold.user_id) as user_hold_count
    // FROM user
    // 	JOIN user_profile
    // 		ON user_profile.user_id = user.id
    // 	JOIN user_package
    // 		ON user_package.user_id = user.id
    // 	JOIN package
    // 		ON user_package.package_id = package.id
    // 	LEFT JOIN user_hold
    // 		ON user_hold.user_id = user.id
    // WHERE user.reseller_id IS NULL AND user.username LIKE "%mako%"
    // GROUP BY user.id
    // LIMIT 10 OFFSET 0;
    const data = database
      .select(
        "user.id as userId",
        "user.username",
        "user.created_at as createdAt",
        "user.active",
        "user_profile.is_provision_fail as isProvisionFail",
        "user_package.package_id as packageId",
        "package.name as package"
      )
      .from<ParentAccountDb>("user")
      .innerJoin("user_profile", "user.id", "user_profile.user_id")
      .innerJoin("user_package", "user.id", "user_package.user_id")
      .innerJoin("package", "user_package.package_id", "package.id")
      .where((builder) => {
        builder.whereNull("user.reseller_id");

        if (filters.userId) {
          builder.where("user.id", filters.userId);
        }

        if (filters.email) {
          builder.whereLike("user.email", `%${filters.email}%`);
        }

        if (filters.username) {
          builder.where("user.username", `%${filters.username}%`);
        }
      })
      .limit(10)
      .offset(0);
    return data;
  },
};
