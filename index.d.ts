declare module "chrome-extension-meta" {
  interface ExtensionSearchMeta {
    id: string;
    iconURL: string;
    title: string;
    rating: string;
    reviewCount: string;
    coverURL: string;
    description: string;
    publish: string;
    ifEstablish: string;
    ifFeatured: string;
    category: string;
    categoryNo: string;
    userCount: string;
  }
  interface ExtensionDeatilData {
    extensionId: string;
    iconUrl: string;
    url: string;
    name: string;
    description: string;
    installCount: number;
    rating: number;
    reviewCount: number;
    detailedDescription?: string;
    additionalImages?: string[];
    version?: string;
    offeredBy?: string;
    updated?: string;
    size?: string;
    languages?: string;
    email?: string;
    websiteUrl?: string;
    privacyPolicyUrl?: string;
  }

  interface SearchOptions {
    limit?: number;
    minRating?: number;
    ifFeatured?: boolean;
    ifWellKnown?: boolean;
  }


  interface SearchResponse {
    success: boolean;
    error: string | null;
    number: number;
    data: ExtensionSearchMeta[];
  }

  interface DetailResponse {
    success: boolean;
    error: string | null;
    details?: ExtensionData;
  }

  function quickSearch(keyword: string): Promise<SearchResponse>;
  function fullSearch(
    keyword: string,
    options?: SearchOptions
  ): Promise<SearchResponse>;
  function getExtMeta(extensionID: string | string[]): Promise<DetailResponse>;

  export { quickSearch, fullSearch, getExtMeta };
}
