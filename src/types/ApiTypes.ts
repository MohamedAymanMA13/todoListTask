/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface DynamicReportDTO {
  /** @format int32 */
  id?: number
  reportName?: string | null
  reportQuery?: string | null
}

export interface ReportDTO {
  appnm?: string | null
  famnm?: string | null
  partId?: string | null
  parnameloc?: string | null
  value?: string | null
}

export interface ReportParamDTO {
  /** @format int32 */
  id?: number
  paramName?: string | null
  name?: string | null
  value?: string | null

  /** @format int32 */
  filterType?: number | null
}

export interface ReportParamListParams {
  /** @format int32 */
  reportTypeId?: number
}
