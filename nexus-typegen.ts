/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./src/context"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  ParentAccountsSearchInput: { // input type
    afterKey?: string | null; // String
    beforeKey?: string | null; // String
    email?: string | null; // String
    limit?: number | null; // Int
    userId?: number | null; // Int
    username?: string | null; // String
  }
  SubusersSearchInput: { // input type
    afterKey?: string | null; // String
    beforeKey?: string | null; // String
    email?: string | null; // String
    limit?: number | null; // Int
    parentUserId?: number | null; // Int
    userId?: number | null; // Int
    username?: string | null; // String
  }
  TeammatesSearchInput: { // input type
    afterKey?: string | null; // String
    beforeKey?: string | null; // String
    email?: string | null; // String
    limit?: number | null; // Int
    parentUserId?: number | null; // Int
    userId?: number | null; // Int
    username?: string | null; // String
  }
}

export interface NexusGenEnums {
  UserStatus: "Active" | "BillingFrozen" | "BillingTerminated" | "BillingWarned" | "ComplianceBanned" | "ComplianceDeactivated" | "ComplianceSuspended" | "ComplianceWarned" | "IncompleteProfile" | "NA" | "ProfileUpdated" | "ProvisionFail" | "ProvisionNeeded" | "ProvisionPending" | "ProvisionPermfail" | "SoftDelete" | "UpgradeReview"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  OfferingsAddon: { // root type
    displayName: string; // String!
    isActive: boolean; // Boolean!
    name: string; // String!
    quantity: number; // Int!
  }
  OfferingsDiscount: { // root type
    displayName: string; // String!
    isActive: boolean; // Boolean!
    name: string; // String!
  }
  OfferingsFlag: { // root type
    isActive: boolean; // Boolean!
    name: string; // String!
  }
  OfferingsPackage: { // root type
    displayName: string; // String!
    isActive: boolean; // Boolean!
    name: string; // String!
  }
  OfferingsPackages: { // root type
    ei: NexusGenRootTypes['OfferingsPackage']; // OfferingsPackage!
    mc: NexusGenRootTypes['OfferingsPackage']; // OfferingsPackage!
  }
  PageInfo: { // root type
    afterKey?: string | null; // String
    beforeKey?: string | null; // String
  }
  ParentAccount: { // root type
    createdAt?: string | null; // String
    package: string; // String!
    status: string; // String!
    userId: number; // Int!
    username: string; // String!
  }
  ParentAccountMinimal: { // root type
    createdAt?: string | null; // String
    userId: number; // Int!
    username: string; // String!
  }
  ParentAccountsSearch: { // root type
    result: NexusGenRootTypes['ParentAccountsSearchResult']; // ParentAccountsSearchResult!
  }
  ParentAccountsSearchData: { // root type
    createdAt?: string | null; // String
    package: string; // String!
    status: NexusGenEnums['UserStatus']; // UserStatus!
    userId: number; // Int!
    username: string; // String!
  }
  ParentAccountsSearchResult: { // root type
    data: NexusGenRootTypes['ParentAccountsSearchData'][]; // [ParentAccountsSearchData!]!
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  Query: {};
  SubusersSearch: { // root type
    result: NexusGenRootTypes['SubusersSearchResult']; // SubusersSearchResult!
  }
  SubusersSearchData: { // root type
    createdAt?: string | null; // String
    parentUserId: number; // Int!
    parentUsername: string; // String!
    status: NexusGenEnums['UserStatus']; // UserStatus!
    userId: number; // Int!
    username: string; // String!
  }
  SubusersSearchResult: { // root type
    data: NexusGenRootTypes['SubusersSearchData'][]; // [SubusersSearchData!]!
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  TeammatesSearch: { // root type
    result: NexusGenRootTypes['TeammatesSearchResult']; // TeammatesSearchResult!
  }
  TeammatesSearchData: { // root type
    createdAt?: string | null; // String
    parentUserId: number; // Int!
    parentUsername: string; // String!
    username: string; // String!
  }
  TeammatesSearchResult: { // root type
    data: NexusGenRootTypes['TeammatesSearchData'][]; // [TeammatesSearchData!]!
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  UserData: { // root type
    createdAt?: string | null; // String
    email: string; // String!
    isActive: boolean; // Boolean!
    resellerId?: number | null; // Int
    userId: number; // Int!
    username: string; // String!
  }
  UserDetailsInfo: { // root type
    profile: NexusGenRootTypes['UserProfile']; // UserProfile!
    status: NexusGenEnums['UserStatus']; // UserStatus!
    user: NexusGenRootTypes['UserData']; // UserData!
  }
  UserDetailsOfferings: { // root type
    addons: NexusGenRootTypes['OfferingsAddon'][]; // [OfferingsAddon!]!
    discounts: NexusGenRootTypes['OfferingsDiscount'][]; // [OfferingsDiscount!]!
    flags: NexusGenRootTypes['OfferingsFlag'][]; // [OfferingsFlag!]!
    packages: NexusGenRootTypes['OfferingsPackages']; // OfferingsPackages!
  }
  UserProfile: { // root type
    phone: string; // String!
    website: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  OfferingsAddon: { // field return type
    displayName: string; // String!
    isActive: boolean; // Boolean!
    name: string; // String!
    quantity: number; // Int!
  }
  OfferingsDiscount: { // field return type
    displayName: string; // String!
    isActive: boolean; // Boolean!
    name: string; // String!
  }
  OfferingsFlag: { // field return type
    isActive: boolean; // Boolean!
    name: string; // String!
  }
  OfferingsPackage: { // field return type
    displayName: string; // String!
    isActive: boolean; // Boolean!
    name: string; // String!
  }
  OfferingsPackages: { // field return type
    ei: NexusGenRootTypes['OfferingsPackage']; // OfferingsPackage!
    mc: NexusGenRootTypes['OfferingsPackage']; // OfferingsPackage!
  }
  PageInfo: { // field return type
    afterKey: string | null; // String
    beforeKey: string | null; // String
  }
  ParentAccount: { // field return type
    createdAt: string | null; // String
    package: string; // String!
    status: string; // String!
    userId: number; // Int!
    username: string; // String!
  }
  ParentAccountMinimal: { // field return type
    createdAt: string | null; // String
    userId: number; // Int!
    username: string; // String!
  }
  ParentAccountsSearch: { // field return type
    result: NexusGenRootTypes['ParentAccountsSearchResult']; // ParentAccountsSearchResult!
  }
  ParentAccountsSearchData: { // field return type
    createdAt: string | null; // String
    package: string; // String!
    status: NexusGenEnums['UserStatus']; // UserStatus!
    userId: number; // Int!
    username: string; // String!
  }
  ParentAccountsSearchResult: { // field return type
    data: NexusGenRootTypes['ParentAccountsSearchData'][]; // [ParentAccountsSearchData!]!
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  Query: { // field return type
    getParentAccounts: NexusGenRootTypes['ParentAccountsSearch']; // ParentAccountsSearch!
    getSubusers: NexusGenRootTypes['SubusersSearch']; // SubusersSearch!
    getTeammates: NexusGenRootTypes['TeammatesSearch']; // TeammatesSearch!
    getUserInfo: NexusGenRootTypes['UserDetailsInfo']; // UserDetailsInfo!
    getUserOfferings: NexusGenRootTypes['UserDetailsOfferings'] | null; // UserDetailsOfferings
    parentAccounts: NexusGenRootTypes['ParentAccount'][]; // [ParentAccount!]!
    parentAccountsMinimal: NexusGenRootTypes['ParentAccountMinimal'][]; // [ParentAccountMinimal!]!
  }
  SubusersSearch: { // field return type
    result: NexusGenRootTypes['SubusersSearchResult']; // SubusersSearchResult!
  }
  SubusersSearchData: { // field return type
    createdAt: string | null; // String
    parentUserId: number; // Int!
    parentUsername: string; // String!
    status: NexusGenEnums['UserStatus']; // UserStatus!
    userId: number; // Int!
    username: string; // String!
  }
  SubusersSearchResult: { // field return type
    data: NexusGenRootTypes['SubusersSearchData'][]; // [SubusersSearchData!]!
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  TeammatesSearch: { // field return type
    result: NexusGenRootTypes['TeammatesSearchResult']; // TeammatesSearchResult!
  }
  TeammatesSearchData: { // field return type
    createdAt: string | null; // String
    parentUserId: number; // Int!
    parentUsername: string; // String!
    username: string; // String!
  }
  TeammatesSearchResult: { // field return type
    data: NexusGenRootTypes['TeammatesSearchData'][]; // [TeammatesSearchData!]!
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  UserData: { // field return type
    createdAt: string | null; // String
    email: string; // String!
    isActive: boolean; // Boolean!
    resellerId: number | null; // Int
    userId: number; // Int!
    username: string; // String!
  }
  UserDetailsInfo: { // field return type
    profile: NexusGenRootTypes['UserProfile']; // UserProfile!
    status: NexusGenEnums['UserStatus']; // UserStatus!
    user: NexusGenRootTypes['UserData']; // UserData!
  }
  UserDetailsOfferings: { // field return type
    addons: NexusGenRootTypes['OfferingsAddon'][]; // [OfferingsAddon!]!
    discounts: NexusGenRootTypes['OfferingsDiscount'][]; // [OfferingsDiscount!]!
    flags: NexusGenRootTypes['OfferingsFlag'][]; // [OfferingsFlag!]!
    packages: NexusGenRootTypes['OfferingsPackages']; // OfferingsPackages!
  }
  UserProfile: { // field return type
    phone: string; // String!
    website: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  OfferingsAddon: { // field return type name
    displayName: 'String'
    isActive: 'Boolean'
    name: 'String'
    quantity: 'Int'
  }
  OfferingsDiscount: { // field return type name
    displayName: 'String'
    isActive: 'Boolean'
    name: 'String'
  }
  OfferingsFlag: { // field return type name
    isActive: 'Boolean'
    name: 'String'
  }
  OfferingsPackage: { // field return type name
    displayName: 'String'
    isActive: 'Boolean'
    name: 'String'
  }
  OfferingsPackages: { // field return type name
    ei: 'OfferingsPackage'
    mc: 'OfferingsPackage'
  }
  PageInfo: { // field return type name
    afterKey: 'String'
    beforeKey: 'String'
  }
  ParentAccount: { // field return type name
    createdAt: 'String'
    package: 'String'
    status: 'String'
    userId: 'Int'
    username: 'String'
  }
  ParentAccountMinimal: { // field return type name
    createdAt: 'String'
    userId: 'Int'
    username: 'String'
  }
  ParentAccountsSearch: { // field return type name
    result: 'ParentAccountsSearchResult'
  }
  ParentAccountsSearchData: { // field return type name
    createdAt: 'String'
    package: 'String'
    status: 'UserStatus'
    userId: 'Int'
    username: 'String'
  }
  ParentAccountsSearchResult: { // field return type name
    data: 'ParentAccountsSearchData'
    pageInfo: 'PageInfo'
  }
  Query: { // field return type name
    getParentAccounts: 'ParentAccountsSearch'
    getSubusers: 'SubusersSearch'
    getTeammates: 'TeammatesSearch'
    getUserInfo: 'UserDetailsInfo'
    getUserOfferings: 'UserDetailsOfferings'
    parentAccounts: 'ParentAccount'
    parentAccountsMinimal: 'ParentAccountMinimal'
  }
  SubusersSearch: { // field return type name
    result: 'SubusersSearchResult'
  }
  SubusersSearchData: { // field return type name
    createdAt: 'String'
    parentUserId: 'Int'
    parentUsername: 'String'
    status: 'UserStatus'
    userId: 'Int'
    username: 'String'
  }
  SubusersSearchResult: { // field return type name
    data: 'SubusersSearchData'
    pageInfo: 'PageInfo'
  }
  TeammatesSearch: { // field return type name
    result: 'TeammatesSearchResult'
  }
  TeammatesSearchData: { // field return type name
    createdAt: 'String'
    parentUserId: 'Int'
    parentUsername: 'String'
    username: 'String'
  }
  TeammatesSearchResult: { // field return type name
    data: 'TeammatesSearchData'
    pageInfo: 'PageInfo'
  }
  UserData: { // field return type name
    createdAt: 'String'
    email: 'String'
    isActive: 'Boolean'
    resellerId: 'Int'
    userId: 'Int'
    username: 'String'
  }
  UserDetailsInfo: { // field return type name
    profile: 'UserProfile'
    status: 'UserStatus'
    user: 'UserData'
  }
  UserDetailsOfferings: { // field return type name
    addons: 'OfferingsAddon'
    discounts: 'OfferingsDiscount'
    flags: 'OfferingsFlag'
    packages: 'OfferingsPackages'
  }
  UserProfile: { // field return type name
    phone: 'String'
    website: 'String'
  }
}

export interface NexusGenArgTypes {
  Query: {
    getParentAccounts: { // args
      searchInput?: NexusGenInputs['ParentAccountsSearchInput'] | null; // ParentAccountsSearchInput
    }
    getSubusers: { // args
      searchInput?: NexusGenInputs['SubusersSearchInput'] | null; // SubusersSearchInput
    }
    getTeammates: { // args
      searchInput?: NexusGenInputs['TeammatesSearchInput'] | null; // TeammatesSearchInput
    }
    getUserInfo: { // args
      userId: number; // Int!
    }
    getUserOfferings: { // args
      userId: number; // Int!
    }
    parentAccounts: { // args
      email?: string | null; // String
      userId?: number | null; // Int
      username?: string | null; // String
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}