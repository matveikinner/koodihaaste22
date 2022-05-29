import { Municipality } from "@lunchbreak/domain/models";
import YmparistoNetwork from "../models/ymparistoNetwork";

export const mapToMunicipality = ({ Kunta_Id, Nimi }: YmparistoNetwork.Municipality): Municipality => ({
  municipalityId: Kunta_Id,
  name: Nimi,
});
