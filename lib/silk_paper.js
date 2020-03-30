const { fileTypes, DEFAULT_DOCS_DIR, DEFAULT_OPEN_API, DEFAULT_TEST_CLIENT } = require('./constants');
const { generateInitialSpecs } = require('./generators/gen_initial_specs');
const { generateDocs } = require('./generators/gen_docs');
const { constructDocumentationObject } = require('./generators/gen_docs_object');
const { extractPathsFromServer } = require('./utils/extractors');

module.exports = class SilkPaper {
  constructor(server, options = {}) {
    this.docsDir = options.docsDir || DEFAULT_DOCS_DIR;
    // TODO: check if it's a valid fileType
    this.fileType = options.fileType ? options.fileType : fileTypes.JSON;
    this.testClient = options.testClient || DEFAULT_TEST_CLIENT;
    this.openapi = options.openApiVersion || DEFAULT_OPEN_API;
    this.paths = extractPathsFromServer(server);
    generateInitialSpecs(server, this);
  }

  /**
   * genDocs.
   *
   * Function to generate documentation based on a REST API response
   *
   * @param {Object} response - An HTTP response object
   * @param {Objects} options - Configuration object
   * @param {Objects} options.description - Description for the endpoint response
   *
   * @return {void}
   */
  genDocs(response, options) {
    generateDocs(response, { ...this, ...options });
  }

  // eslint-disable-next-line valid-jsdoc
  /**
   * genDocsObject.
   *
   * Function to generate documentation object to UI server
   *
   * @return {Object}
   */
  getDocumentation() {
    return constructDocumentationObject({ ...this });
  }

  /**
   * genDocs (static). TODO
   *
   * Function to generate documentation based on a REST API response
   *
   * @param {Object} response - An HTTP response object
   * @param {Objects} options - Configuration object
   * @param {Objects} options.description - Description for the endpoint response
   * @param {Objects} options.docsDir  -  Path to the folder in which the documentation is stored
   * @param {Objects} options.path - REST API path that is being documented
   *
   * @return {void}
   */
  static genDocs(response, options) {
    generateDocs(response, { description: options.description });
  }
};
