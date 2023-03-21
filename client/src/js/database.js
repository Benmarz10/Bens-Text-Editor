import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Put to database');
  const jateDB = await openDB('jate', 1);
  const txt = jateDB.transaction('jate', 'readwrite');
  const store = txt.objectStore('jate');
  const request = store.put({ id: 1, value: content } );
  const result = await request;
  console.log('Data saved to the database', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from the database');
  const jateDB = await openDB('jate', 1);
  const txt = jateDB.transaction('jate', 'readonly');
  const store = txt.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  console.log('result.value', result.value);
  return result.value;
};

initdb();
