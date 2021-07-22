export type Navigation = {
  navigate: (scene: string) => void;
};

export type AuthDetails = {
  email: string;
  password: string;
  name?: string;
};

export type Path = {
  mls: string,
  state: string,
}

export type Neighborhood = {
  fnMask: string,
  fnGeo: string,
}

export type MlsInfo = {
  mlsSubscription: string,
  mlsId: string,
  firstName: string,
  lastName: string,
  officeName: string,
}

