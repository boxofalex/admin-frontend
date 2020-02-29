// RFC3986 - https://tools.ietf.org/html/rfc3986

import { Uri } from './uri';
import { AbnfParser } from '../rfc-abnf/abnf.parser';

export class UriParser {
  public static readonly uriNamesMap = {
    uri: 1,
    scheme: 2,
    authority: 3,
    userInfo: 4,
    host: 5,
    port: 6,
    path: 7,
    absolutePath: 8,
    rootlessPath: 9,
    query: 10,
    fragment: 11,
  };
  public static readonly relativeRefNamesMap = {
    relativeUri: 1,
    authority: 2,
    userInfo: 3,
    host: 4,
    port: 5,
    query: 6,
    fragment: 7,
  };
  public static readonly absoluteUriNamesMap = {
    absoluteUri: 1,
    scheme: 2,
    authority: 3,
    userInfo: 4,
    host: 5,
    port: 6,
    path: 7,
    absolutePath: 8,
    rootlessPath: 9,
    query: 10,
  };
  public static pctEncoded = `%${AbnfParser.hexDigit}{2}`;
  public static genDelims = '[:/?#\\[\\]@]';
  public static subDelims = '[!$&\'()*+,;=]';
  public static reserved = `(?:${UriParser.genDelims}|${UriParser.subDelims})`;
  public static unreserved = `(?:${AbnfParser.alpha}|[а-яА-Я]|${AbnfParser.digit}|[-._~])`; // ToDo: сделать по RFC для Unicode
  public static scheme = `(${AbnfParser.alpha}(?:${AbnfParser.alpha}|${AbnfParser.digit}|[+-.])*)`;
  public static userInfo = `((?:${UriParser.unreserved}|${UriParser.pctEncoded}|${UriParser.subDelims}|:)*)`;
  public static IPvFuture = `v${AbnfParser.hexDigit}+\\.(?:${UriParser.unreserved}|${UriParser.subDelims}|:)`;
  public static h16 = `${AbnfParser.hexDigit}{1,4}`;
  public static decOctet = '(?:25[0-5]|2[0-5]\\d|1\\d{2}|[1-9]\\d|\\d)';
  public static IPv4Address = `${UriParser.decOctet}\\.${UriParser.decOctet}\\.${UriParser.decOctet}\\.${UriParser.decOctet}`;
  public static ls32 = `(?:${UriParser.h16}:${UriParser.h16}|${UriParser.IPv4Address})`;
  public static IPv6Address = `(?:(?:${UriParser.h16}:){6}${UriParser.ls32}|` +
    `::(?:${UriParser.h16}:){5}${UriParser.ls32}|` +
    `${UriParser.h16}?::(?:${UriParser.h16}:){4}${UriParser.ls32}|` +
    `(?:(?:${UriParser.h16}:){0,1}${UriParser.h16})?::(?:${UriParser.h16}:){3}${UriParser.ls32}|` +
    `(?:(?:${UriParser.h16}:){0,2}${UriParser.h16})?::(?:${UriParser.h16}:){2}${UriParser.ls32}|` +
    `(?:(?:${UriParser.h16}:){0,3}${UriParser.h16})?::${UriParser.h16}:${UriParser.ls32}|` +
    `(?:(?:${UriParser.h16}:){0,4}${UriParser.h16})?::${UriParser.ls32}|` +
    `(?:(?:${UriParser.h16}:){0,5}${UriParser.h16})?::${UriParser.h16}|` +
    `(?:(?:${UriParser.h16}:){0,6}${UriParser.h16})?::)`;
  public static IPLiteral = `\\[(?:${UriParser.IPv6Address}|${UriParser.IPvFuture})\\]`;
  public static regName = `(?:${UriParser.unreserved}|${UriParser.pctEncoded}|${UriParser.subDelims})*`;
  public static host = `(${UriParser.IPLiteral}|${UriParser.IPv4Address}|${UriParser.regName})`;
  public static port = `(${AbnfParser.digit}*)`;
  public static authority = `((?:${UriParser.userInfo}@)?${UriParser.host}(?:\\:${UriParser.port})?)`;
  public static pChar = `(?:${UriParser.unreserved}|${UriParser.pctEncoded}|${UriParser.subDelims}|[:@])`;
  public static segment = `${UriParser.pChar}*`;
  public static segmentNZ = `${UriParser.pChar}+`;
  public static segmentNZNC = `(?:${UriParser.unreserved}|${UriParser.pctEncoded}|${UriParser.subDelims}|@)+`;
  public static pathAbempty = `(?:\\/${UriParser.segment})*`;
  public static pathAbsolute = `\\/(?:${UriParser.segmentNZ}${UriParser.pathAbempty})?`;
  public static pathNoScheme = `${UriParser.segmentNZNC}${UriParser.pathAbempty}`;
  public static pathRootless = `${UriParser.segmentNZ}${UriParser.pathAbempty}`;
  public static path = `(${UriParser.pathAbempty}|${UriParser.pathAbsolute}|${UriParser.pathNoScheme}|${UriParser.pathRootless})*`;
  public static query = `((?:${UriParser.pChar}|\\/|\\?)*)`;
  public static fragment = `((?:${UriParser.pChar}|\\/|\\?)*)`;
  public static hierPart = `(?:\\/\\/${UriParser.authority}(${UriParser.pathAbempty})|(${UriParser.pathAbsolute})|((?:${UriParser.pathRootless})*))`;
  public static uri = `((?:${UriParser.scheme}:)?${UriParser.hierPart}(?:\\?${UriParser.query})?(?:\\#${UriParser.fragment})?)`;
  public static relativePart = `(?:\\/\\/${UriParser.authority}${UriParser.pathAbempty}|${UriParser.pathAbsolute}|${UriParser.pathNoScheme})+`;
  public static relativeRef = `(${UriParser.relativePart}(?:\\?${UriParser.query})?(?:\\#${UriParser.fragment})?)`;
  public static absoluteUri = `(${UriParser.scheme}:${UriParser.hierPart}(?:\\?${UriParser.query})?)`;

  public static parse(url: string, locale: string = 'ru-RU') {
    const regexp = new RegExp(UriParser.uri);
    const regexpRes: any = regexp.exec(url);
    const res = {};
    if (regexpRes[this.uriNamesMap.query]) {
      res['query'] = regexpRes[this.uriNamesMap.query].split('&')
        .map((item) => item.split('='))
        .reduce((acc, item) => {
          acc[item[0]] = item[1];
          return acc;
        }, {});
    }
    if (regexpRes[this.uriNamesMap.path]) {
      res['path'] = regexpRes[this.uriNamesMap.path];
    }
    if (regexpRes[this.uriNamesMap.absolutePath]) {
      res['path'] = regexpRes[this.uriNamesMap.absolutePath];
    }
    if (regexpRes[this.uriNamesMap.rootlessPath]) {
      res['path'] = regexpRes[this.uriNamesMap.rootlessPath];
    }
    if (regexpRes[this.uriNamesMap.port]) {
      res['port'] = parseInt(regexpRes[this.uriNamesMap.port], 10);
    }
    let authority = regexpRes[this.uriNamesMap.authority];
    if (!authority) {
      if ((new RegExp(UriParser.authority)).test(regexpRes[this.uriNamesMap.uri])) {
        authority = regexpRes[this.uriNamesMap.uri];
      } else {
        authority = '';
      }
    }
    return new Uri({
      authority: <any>authority,
      fragment: <any>regexpRes[this.uriNamesMap.fragment],
      host: <any>regexpRes[this.uriNamesMap.host],
      path: <any>res['path'],
      port: <any>res['port'],
      query: <any>res['query'],
      scheme: <any>regexpRes[this.uriNamesMap.scheme],
      uri: <any>regexpRes[this.uriNamesMap.uri],
      userInfo: <any>regexpRes[this.uriNamesMap.userInfo],
    });
  }


  public static getDomainFirstLevel(domain: string) {
    const uri = this.parse(domain);
    domain = uri.host ? uri.host : domain;
    const parser = domain.split('.');
    domain = parser.length > 2 ? parser.slice(1).join('.') : domain;
    return domain;
  }

  public static getPathPartByIndex(uri: string, index: number) {
    return this.parse(uri).pathSplitted[index];
  }
}
