/* eslint-disable prefer-object-spread */
const { fileTypes, DEFAULT_DOCS_DIR, DEFAULT_OPEN_API, DEFAULT_TEST_CLIENT } = require('./constants');
const { generateInitialSpecs } = require('./specification/gen_initial_specs');
const { generateSpec } = require('./specification/gen_spec');
const { buildSpecObject } = require('./specification/build_spec_object');
const { extractPathsFromServer } = require('./utils/extractors');

module.exports = class SilkPaper {
  // TODO: complete documentation when other features are added
  /**
   * SilkPaper.
   *
   * Creates an instance of the SilkPaper class and generates the initial specification for the server and its endpoints.
   *
   * @param {Object} server - A rest server instance, from which to obtain intial information about the API.
   * @param {Objects} options - Configuration Object.
   * @param {Objects} options.docsDir  -  Path to the folder in which the documentation is stored.
   * @param {Objects} options.fileType  - Desired file type to stored the documentation.
   */
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
   * Function to generate documentation based on a REST API response.
   *s
   * @param {Object} response - An HTTP response object.
   * @param {Objects} options - Configuration object.
   * @param {Objects} options.description - Description for the endpoint response.
   *
   * @return {void}
   */
  genDocs(response, options) {
    generateSpec(response, Object.assign({}, this, options));
  }

  /**
   * genDocs (static).
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
    generateSpec(response, {
      description: options.description,
      paths: [options.path],
      docsDir: options.docsDir
    });
  }

  /**
   * buildDocs.
   *
   * Function to generate documentation (OpenApi specification) object to UI server
   *
   * @return {Object} - OpenApi Specification object
   */
  static buildDocs() {
    return buildSpecObject(this);
  }
};
