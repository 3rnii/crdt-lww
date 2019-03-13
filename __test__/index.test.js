import LWWSet from '../index';

describe('CRDT Set - LWW', () => {
  it('adds data', () => {
    const set = new LWWSet();
    set.add("Vase", 1);
    set.add("Ornament", 5);
    set.add("Plant", 7);
    const expected = new Map([["Vase", 1], ["Ornament", 5], ["Plant", 7]]);

    expect(set.addSet).toEqual(expected);
    expect(set.removeSet).toEqual(new Map());
  });

  it('adds the latest data', () => {
    const set = new LWWSet();
    set.add('Chocolate', 1);
    set.add('Tea', 1);
    set.add('Chocolate', 5);
    const expected = new Map([["Tea", 1], ["Chocolate", 5]]);

    expect(set.addSet).toEqual(expected);
    expect(set.removeSet).toEqual(new Map());
  });

  it('removes data', () => {
    const set = new LWWSet();
    set.remove("Vase", 1);
    set.remove("Ornament", 5);
    set.remove("Plant", 7);
    const expected = new Map([["Vase", 1], ["Ornament", 5], ["Plant", 7]]);

    expect(set.removeSet).toEqual(expected);
    expect(set.addSet).toEqual(new Map());
  });

  it('removes the latest data', () => {
    const set = new LWWSet();
    set.remove('Chocolate', 1);
    set.remove('Tea', 1);
    set.remove('Chocolate', 5);
    const expected = new Map([["Tea", 1], ["Chocolate", 5]]);

    expect(set.removeSet).toEqual(expected);
    expect(set.addSet).toEqual(new Map());
  });

  it('Gets a list of the data stored, returning only the latest version of each item', () => {
    const set = new LWWSet();
    set.add("Bob", 1);
    set.add("Jack", 2);
    set.add('Mary', 5);
    set.remove('Jack', 7);
    set.remove('Bob', 9);
    const expectedAddSet = new Map([['Bob', 1], ["Jack", 2], ["Mary", 5]]);
    const expectedRemoveSet = new Map([["Jack", 7], ["Bob", 9]]);
    const expectedSet = ["Mary"];

    expect(set.addSet).toEqual(expectedAddSet);
    expect(set.removeSet).toEqual(expectedRemoveSet);
    expect(set.get()).toEqual(expectedSet);
  });

  it('Gets a list of data stored, with only add functions used', () => {
    const set = new LWWSet();
    set.add("Bob", 1);
    set.add("Jack", 2);
    set.add('Mary', 5);
    const expectedAddSet = new Map([['Bob', 1], ["Jack", 2], ["Mary", 5]]);
    const expectedSet = ["Bob", "Jack", "Mary"];

    expect(set.addSet).toEqual(expectedAddSet);
    expect(set.removeSet).toEqual(new Map());
    expect(set.get()).toEqual(expectedSet);
  });

  it('Gets a list of data store, with only remove functions used', () => {
    const set = new LWWSet();
    set.remove("Bob", 1);
    set.remove("Jack", 2);
    set.remove('Mary', 5);
    const expectedRemoveSet = new Map([['Bob', 1], ["Jack", 2], ["Mary", 5]]);

    expect(set.removeSet).toEqual(expectedRemoveSet);
    expect(set.addSet).toEqual(new Map());
    expect(set.get()).toEqual([]);
  });

  it('Gets the size of the set', () => {
    const set = new LWWSet();
    set.add("Bob", 1);
    set.add("Jack", 2);
    set.add('Mary', 5);
    set.remove('Jack', 7);
    set.remove('Bob', 9);
    set.add('Jill', 10);

    expect(set.size()).toEqual(2);
  });

  it('Checks if the current value is the latest entry', () => {
    const set = new LWWSet();
    set.add("Bob", 1);
    set.add("Jack", 2);
    set.add('Mary', 5);
    set.remove('Jack', 7);
    set.remove('Bob', 9);
    set.add('Jill', 10);

    expect(set.isLatest('Mary')).toBeFalsy();
    expect(set.isLatest('Jill')).toBeTruthy();
  });

  it('Checks if a value exists in the set', () => {
    const set = new LWWSet();
    set.add("Bob", 1);
    set.add("Jack", 2);
    set.add('Mary', 5);
    set.remove('Jack', 7);
    set.remove('Bob', 9);
    set.add('Jill', 10);

    expect(set.has('Bob')).toBeFalsy();
    expect(set.has('Jack')).toBeFalsy();
    expect(set.has('Mary')).toBeTruthy();
    expect(set.has('Jill')).toBeTruthy();
    expect(set.has('Zack')).toBeFalsy();
  });

  it('Gets the latest value in a set', () => {
    const set = new LWWSet();
    set.add("Bob", 1);
    set.add("Jack", 2);
    set.add('Mary', 5);
    set.remove('Jack', 7);
    set.remove('Bob', 9);
    set.add('Jill', 10);

    expect(set.getLatest()).toEqual('Jill');
  });
});
