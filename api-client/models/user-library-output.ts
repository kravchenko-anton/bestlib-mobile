/* tslint:disable */
/* eslint-disable */
/**
 * booknest
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import type { UserLibraryOutputReadingBooksInner } from './user-library-output-reading-books-inner';

/**
 * 
 * @export
 * @interface UserLibraryOutput
 */
export interface UserLibraryOutput {
    /**
     * 
     * @type {Array<UserLibraryOutputReadingBooksInner>}
     * @memberof UserLibraryOutput
     */
    'readingBooks': Array<UserLibraryOutputReadingBooksInner>;
    /**
     * 
     * @type {Array<UserLibraryOutputReadingBooksInner>}
     * @memberof UserLibraryOutput
     */
    'finishedBooks': Array<UserLibraryOutputReadingBooksInner>;
    /**
     * 
     * @type {Array<UserLibraryOutputReadingBooksInner>}
     * @memberof UserLibraryOutput
     */
    'savedBooks': Array<UserLibraryOutputReadingBooksInner>;
}

