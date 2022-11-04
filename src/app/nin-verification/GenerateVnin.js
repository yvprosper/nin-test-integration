class GenerateVnin {
    constructor({ ninRepository}) {
      this.ninRepository = ninRepository;
    }
  
    async execute(payload) {
      try {
        return await this.ninRepository.generateVNin(payload);
      } catch (error) {
        throw error;
      } 
    }
}
  
export default GenerateVnin;
  