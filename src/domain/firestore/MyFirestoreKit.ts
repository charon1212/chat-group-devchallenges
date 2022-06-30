import { collection, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore";
import { db } from "../../app/firebase/firebase";

export type FirestoreKitParam<Domain, Collection extends Object, PathParam> = {
  collectionPath: (pathParam: PathParam) => string,
  encode: (data: Domain) => Collection,
  decode: (uid: string, data: Collection, pathParam: PathParam) => Domain,
};

export class MyFirestoreKit<Domain, Collection extends Object, PathParam> {

  constructor(public param: FirestoreKitParam<Domain, Collection, PathParam>) { }

  async find(pathParam: PathParam): Promise<Domain[]> {
    const collectionPath = this.param.collectionPath(pathParam);
    const collectionRef = collection(db, collectionPath);
    const q = query(collectionRef);
    const snapshots = await getDocs(q);
    const docList: Domain[] = [];
    snapshots.forEach((snapshot) => {
      const data = snapshot.data() as Collection;
      docList.push(this.param.decode(snapshot.id, data, pathParam));
    });
    return docList;
  }

  async get(pathParam: PathParam, uid: string): Promise<Domain | undefined> {
    const collectionPath = this.param.collectionPath(pathParam);
    const snapshot = await getDoc(doc(db, collectionPath, uid));
    if (!snapshot.exists()) return undefined;
    const data = snapshot.data() as Collection;
    return this.param.decode(snapshot.id, data, pathParam);
  }

  async set(pathParam: PathParam, uid: string, data: Domain) {
    const collectionPath = this.param.collectionPath(pathParam);
    await setDoc(doc(db, collectionPath, uid), this.param.encode(data));
  }

}
