import { inject, injectable } from "inversify";
import LUNCHBREAK_BINDINGS from "@lunchbreak/di/lunchbreak.bindings";
import YmparistoRepository from "../repositories/ymparistoRepository";

@injectable()
class GetMunicipalitiesUseCase {
  @inject(LUNCHBREAK_BINDINGS.YmparistoRepository) private ymparistoRepository!: YmparistoRepository;

  invoke = () => this.ymparistoRepository.getMunicipalities();
}

export default GetMunicipalitiesUseCase;
