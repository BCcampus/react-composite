export interface PackageData {
  /** Package name as in npm, for example, `mantine-extension-template` */
  packageName: string;

  /** Description of the package, displayed below the title in documentation */
  packageDescription: string;

  /** Link to the documentation mdx file, used in "Edit this page button" */
  mdxFileUrl: string;

  /** Link to the repository on GitHub, used in header github icon and in "View source code button" */
  repositoryUrl: string;

  /** Link to the license file */
  licenseUrl?: string;

  /** Information about the author of the package */
  author: {
    /** Package author name, for example, `John Doe` */
    name: string;

    /** Author GitHub username, for example, `rtivital` */
    githubUsername: string;
  };
}

export const PACKAGE_DATA: PackageData = {
  packageName: '@bccampus/react-composite',
  packageDescription:
    'Base React component to create a composite components, like Listbox,TreeView, with selection and expansion management',
  mdxFileUrl: 'https://github.com/bccampus/react-composite/blob/master/docs/pages/index.mdx',
  repositoryUrl: 'https://github.com/bccampus/react-composite',
  licenseUrl: 'https://github.com/bccampus/react-composite/blob/master/LICENSE',
  author: {
    name: 'Kemal Tunador',
    githubUsername: 'ktunador',
  },
};
