class VerifyVnin {
    constructor({ ninRepository}) {
      this.ninRepository = ninRepository;
    }
  
    async execute(payload) {
      try {
        return await this.ninRepository.verifyVNin(payload);
      } catch (error) {
        throw error;
      } 
    }
}
  
export default VerifyVnin;
  