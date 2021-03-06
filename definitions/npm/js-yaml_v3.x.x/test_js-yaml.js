// @flow
import * as yaml from 'js-yaml';

const type1 = new yaml.Type('!type1');
const type2 = new yaml.Type('!type2', { kind: 'scalar', defaultStyle: 'lowercase' });

// $FlowExpectedError
new yaml.Type('!!include', { foo: 666 });
// $FlowExpectedError
new yaml.Type('!!include', { kind: 'nonsense' });

(type1.resolve(42): boolean);
(type1.kind: string);
// $FlowExpectedError
type1.foo;

(new yaml.Schema({
  implicit: [ type1 ],
  explicit: [ type2 ],
  include: [ yaml.SAFE_SCHEMA ],
}): yaml.Schema);
// $FlowExpectedError
new yaml.Schema({ foo: [ type1 ] });

(yaml.Schema.create(type1): yaml.Schema);
(yaml.Schema.create(yaml.SAFE_SCHEMA, [ type1, type2 ]): yaml.Schema);
// $FlowExpectedError
yaml.Schema.create(yaml.SAFE_SCHEMA);

(yaml.Schema.create(type1).implicit: ?Array<yaml.Type>);
(yaml.Schema.create(type1).include: ?Array<yaml.Schema>);
// $FlowExpectedError
yaml.Schema.create(type1).foo;

(yaml.load('{ x: 42 }'): mixed);
(yaml.load('{ x: 42 }', { strict: true }): mixed);
// $FlowExpectedError
yaml.load({ x: 42 });

(yaml.safeLoad('{ x: 42 }'): mixed);
(yaml.safeLoad('{ x: 42 }', { strict: true }): mixed);
// $FlowExpectedError
yaml.safeLoad('{ x: 42 }', { foo: 666 });

(yaml.loadAll('[]'): Array<mixed>);
(yaml.loadAll('[]', undefined, { filename: 'foo.yaml', json: false }): Array<mixed>);
yaml.loadAll('[]', (doc: mixed) => console.log(doc));
yaml.loadAll('[]', (doc: mixed) => console.log(doc), { schema: yaml.FAILSAFE_SCHEMA });
// $FlowExpectedError
yaml.loadAll('[]', null, { foo: 666 });

(yaml.safeLoadAll('[]'): Array<mixed>);
(yaml.safeLoadAll('[]', null, { filename: 'foo.yaml', strict: true }): Array<mixed>);
yaml.safeLoadAll('[]', (doc: mixed) => console.log(doc));
yaml.safeLoadAll('[]', (doc: mixed) => console.log(doc), { schema: yaml.SAFE_SCHEMA });
// $FlowExpectedError
yaml.safeLoadAll([ 42 ]);

(yaml.dump(42): string);
(yaml.dump([ 42 ], { indent: 2, sortKeys: (a, b) => 0 }): string);
// $FlowExpectedError
yaml.dump(42, { foo: 666 });

(yaml.safeDump(42): string);
(yaml.safeDump([ 42 ], { indent: 2, sortKeys: true }): string);
// $FlowExpectedError
yaml.safeDump(42, { sortKeys: 'x' });
