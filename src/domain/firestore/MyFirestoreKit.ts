import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, QueryConstraint, setDoc } from "firebase/firestore";
import { db } from "../../app/firebase/firebase";
import { log } from "../util/log";

export type FirestoreKitParam<Domain, Collection extends Object, PathParam> = {
  collectionPath: (pathParam: PathParam) => string,
  encode: (data: Domain) => Collection,
  decode: (uid: string, data: Collection, pathParam: PathParam) => Domain,
};

export class MyFirestoreKit<Domain, Collection extends Object, PathParam> {

  constructor(public param: FirestoreKitParam<Domain, Collection, PathParam>) { }

  async find(pathParam: PathParam, queries?: QueryConstraint[]): Promise<Domain[]> {
    log('find', { pathParam, queries });
    const collectionPath = this.param.collectionPath(pathParam);
    const collectionRef = collection(db, collectionPath);
    const q = query(collectionRef, ...(queries || []));
    const snapshots = await getDocs(q);
    const docList: Domain[] = [];
    snapshots.forEach((snapshot) => {
      const data = snapshot.data() as Collection;
      docList.push(this.param.decode(snapshot.id, data, pathParam));
    });
    return docList;
  }

  listenCollection(pathParam: PathParam, observer: (list: Domain[]) => unknown,) {
    log('listenCollection', { pathParam, observer });
    const collectionPath = this.param.collectionPath(pathParam);
    const q = query(collection(db, collectionPath));
    return onSnapshot(q, (querySnapshot) => {
      const dataList: Domain[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Collection;
        dataList.push(this.param.decode(doc.id, data, pathParam));
      });
      observer(dataList);
    });
  }

  async get(pathParam: PathParam, uid: string): Promise<Domain | undefined> {
    log('get', { pathParam, uid });
    const collectionPath = this.param.collectionPath(pathParam);
    const snapshot = await getDoc(doc(db, collectionPath, uid));
    if (!snapshot.exists()) return undefined;
    const data = snapshot.data() as Collection;
    return this.param.decode(snapshot.id, data, pathParam);
  }

  async set(pathParam: PathParam, uid: string, data: Domain) {
    log('set', { pathParam, uid, data });
    const collectionPath = this.param.collectionPath(pathParam);
    await setDoc(doc(db, collectionPath, uid), this.param.encode(data));
  }

  async add(pathParam: PathParam, data: Domain) {
    log('add', { pathParam, data });
    const collectionPath = this.param.collectionPath(pathParam);
    return await addDoc(collection(db, collectionPath), this.param.encode(data));
  }

  async delete(pathParam: PathParam, uid: string) {
    log('delete', { pathParam, uid });
    const collectionPath = this.param.collectionPath(pathParam);
    return await deleteDoc(doc(db, collectionPath, uid));
  }

}
