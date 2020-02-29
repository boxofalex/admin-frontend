// ABNF-parser for RFC5234 - https://tools.ietf.org/html/rfc5234

export class AbnfParser {
  public static alpha = '[a-zA-Z]';
  public static bit = '[01]';
  public static char = '[\x01-\x7F]'; // any 7-bit US-ASCII character, excluding NUL
  public static cr = '\\r'; // carriage return
  public static crlf = '\\r\\n'; // Internet standard newline
  public static ctl = '[\x00-\x1F\x7F]'; // controls
  public static digit = '\\d';
  public static dquote = '\x22';
  public static hexDigit = '[\\dA-F]';
  public static htab = '[\x09]'; // horizontal tab
  public static sp = '\x20'; // space
  public static wsp = `(${AbnfParser.sp}|${AbnfParser.htab})`; // white space
  public static lf = '[\x0A]'; // linefeed
  // Use of this linear-white-space rule permits lines containing only white space that are
  // no longer legal in mail headers and have caused interoperability problems in other contexts.
  // Do not use when defining mail headers and use with caution in other contexts.
  public static lwsp = `(${AbnfParser.wsp}|${AbnfParser.crlf}${AbnfParser.wsp})`;
  public static octet = '[\x00-\xFF]'; // 8 bits of data
  public static vchar = '[\x21-\x7E]'; // visible (printing) characters

  // private static comment = `;(?:${AbnfParser.wsp}|${AbnfParser.vchar})*${AbnfParser.crlf}`;
  // private static cNl = `(?:${AbnfParser.comment}|${AbnfParser.crlf})`; // comment or newline
  // private static cWsp = `(?:${AbnfParser.wsp}|${cNl}${AbnfParser.wsp})`;
  // private static repetition = `${AbnfParser.repeat}?${AbnfParser.element}`;
  // private static concatenation = `${AbnfParser.repetition}(?:${AbnfParser.cWsp}+${AbnfParser.repetition})*`;
  // private static alternation = `${AbnfParser.concatenation}(?:${AbnfParser.cWsp}*/${AbnfParser.cWsp}*${AbnfParser.concatenation})*`;
  // private static group = `\\(${AbnfParser.cWsp}*${}`;
  // private static element = `(?:${AbnfParser.rulename}|${AbnfParser.group}|${AbnfParser.option}|${AbnfParser.charVal}|${AbnfParser.numVal}|${AbnfParser.proseVal})`;
  // private static repeat = `(?:${AbnfParser.digit}+|${AbnfParser.digit}*\\*${AbnfParser.digit}*)`;
  // private static elements = `${AbnfParser.alternation}${AbnfParser.cWsp}*`;
  // private static definedAs = `${AbnfParser.cWsp}*(?:=|=/)${AbnfParser.cWsp}*`; // basic rules definition and incremental alternatives
  // private static ruleName = `${AbnfParser.alpha}(?:${AbnfParser.alpha}|${AbnfParser.digit}|-)*`;
  // private static rule = `${AbnfParser.ruleName}${AbnfParser.definedAs}${AbnfParser.elements}${AbnfParser.cNl}`; // continues if next line starts with white space
  // private static ruleList = `(?:${AbnfParser.rule}|${AbnfParser.cWsp}*${AbnfParser.cNl})+`;
}
