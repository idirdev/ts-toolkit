import { describe, it, expect } from 'vitest';
import { camelCase, slugify, truncate, capitalize, escapeHtml, template, words } from '../src/string';


describe('string utilities', () => {
  describe('camelCase', () => {
    it('converts kebab-case', () => {
      expect(camelCase('hello-world')).toBe('helloWorld');
    });
    it('converts snake_case', () => {
      expect(camelCase('hello_world')).toBe('helloWorld');
    });
    it('handles already camelCase', () => {
      expect(camelCase('helloWorld')).toBe('helloWorld');
    });
  });

  describe('slugify', () => {
    it('converts to url-safe slug', () => {
      expect(slugify('Hello World!')).toBe('hello-world');
    });
    it('handles multiple spaces and special chars', () => {
      expect(slugify('  My  Post -- Title!  ')).toBe('my-post-title');
    });
    it('handles unicode', () => {
      expect(slugify('café résumé')).toBe('cafe-resume');
    });
  });

  describe('truncate', () => {
    it('truncates long strings with ellipsis', () => {
      expect(truncate('hello world', 8)).toBe('hello...');
    });
    it('does not truncate short strings', () => {
      expect(truncate('hello', 10)).toBe('hello');
    });
    it('uses custom suffix', () => {
      expect(truncate('hello world', 8, '…')).toBe('hello w…');
    });
  });

  describe('capitalize', () => {
    it('capitalizes first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
    });
    it('handles empty string', () => {
      expect(capitalize('')).toBe('');
    });
  });

  describe('escapeHtml', () => {
    it('escapes html entities', () => {
      expect(escapeHtml('<div class="test">&</div>')).toBe(
        '&lt;div class=&quot;test&quot;&gt;&amp;&lt;/div&gt;'
      );
    });
  });

  describe('words', () => {
    it('splits string into words', () => {
      expect(words('hello world')).toEqual(['hello', 'world']);
    });
    it('handles camelCase', () => {
      expect(words('helloWorld')).toEqual(['hello', 'World']);
    });
  });
});
