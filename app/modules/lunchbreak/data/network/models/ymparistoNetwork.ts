namespace YmparistoNetwork {
  export interface GetMunicipalitiesResponse {
    ["odata.metadata"]: string;
    value: Municipality[];
  }

  export interface Municipality {
    Kunta_Id: number;
    Nimi: string;
    NimiRuo: string;
    Ely_Id: number;
    YmpVastuuEly_Id: number;
    Seutukunta_Id: number;
    Maakunta_Id: number;
    YTunnus: string;
  }
}

export default YmparistoNetwork;
