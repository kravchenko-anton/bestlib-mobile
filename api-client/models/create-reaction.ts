/* tslint:disable */
/* eslint-disable */
/**
 * bestLib
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * Contact: Github repository
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



/**
 * 
 * @export
 * @interface CreateReaction
 */
export interface CreateReaction {
    /**
     * 
     * @type {string}
     * @memberof CreateReaction
     */
    'bookId': string;
    /**
     * 
     * @type {string}
     * @memberof CreateReaction
     */
    'type': string;
    /**
     * 
     * @type {string}
     * @memberof CreateReaction
     */
    'description'?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateReaction
     */
    'text': string;
    /**
     * 
     * @type {string}
     * @memberof CreateReaction
     */
    'xpath': string;
    /**
     * 
     * @type {number}
     * @memberof CreateReaction
     */
    'startOffset': number;
    /**
     * 
     * @type {number}
     * @memberof CreateReaction
     */
    'endOffset': number;
}

