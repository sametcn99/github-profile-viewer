import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type GitHubRepo = {
  id: number;
  name: string;
  filename: string;
  stars: number;
  html_url: string;
  home_page: string;
  homepage: string;
  description: string;
  created_at: string;
  updated_at: string;
  topics: string[];
  stargazers_count: number;
  license_name: string;
  license_url: string;
  language: string;
  license_key: string;
  license_spdx_id: string;
  files: string[];
  license: {
    spdx_id: string;
  };
};
