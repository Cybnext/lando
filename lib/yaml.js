'use strict';

// Modules
const fs = require('fs-extra');
const Log = require('./logger');
const path = require('path');
const yaml = require('js-yaml');

module.exports = (logger) => {

  // Set up the logger
  const log = logger || new Log();

  /**
   * Loads a yaml object from a file
   *
   * @since 3.0.0
   * @alias 'lando.yaml.load'
   * @param {String} file - The path to the file to be loaded
   * @return {Object} The loaded object
   * @example
   *
   * // Add a string to the cache
   * var thing = lando.yaml.load('/tmp/myfile.yml');
   */
  const load = (file) => {

    // Try to load the file
    try {
      return yaml.safeLoad(fs.readFileSync(file));
    }

    // If not warn the user of some sort of parse error
    catch (e) {
      log.error('Problem parsing %s with %s', file, e.message);
    }

  };

  /**
   * Dumps an object to a YAML file
   *
   * @since 3.0.0
   * @alias 'lando.yaml.dump'
   * @param {String} file - The path to the file to be loaded
   * @param {Object} data - The object to dump
   * @return - Flename
   */
  const dump = (file, data) => {

    // Make sure we have a place to store these files
    fs.mkdirpSync(path.dirname(file));

    // Remove any properties that might be bad and dump
    data = JSON.parse(JSON.stringify(data));

    // And dump
    fs.writeFileSync(file, yaml.safeDump(data));

    // And return filename
    return file;

  };

  // Return
  return {
    dump,
    load
  };

};
