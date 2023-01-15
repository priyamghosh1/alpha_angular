

export class User{
  // tslint:disable-next-line:variable-name
  constructor(public uniqueId: number,
              public userName: string,
              public _authKey: string,
              public userTypeId: number,
              public userTypeName: string,
              public assemblyConstituencyId: number,
              public districtId: number,
  ){}



  get authKey(){
    if (this._authKey){
      return this._authKey;
    }else {
      return null;
    }
  }
  get isAuthenticated(){
    if (this._authKey){
      return true;
    }else{
      return false;
    }
  }
  get isDeveloper(){
    // tslint:disable-next-line:triple-equals
    return this.userTypeId == 1;
  }
  get isOwner(){
    // tslint:disable-next-line:triple-equals
    return this.userTypeId == 2;
  }
  get isLegislativeCandidate(){
    // tslint:disable-next-line:triple-equals
    return this.userTypeId == 3;
  }
  get isLegendPanel(){
    // tslint:disable-next-line:triple-equals
    return this.userTypeId == 4;
  }
  get isDistrictAdminPanel(){
    // tslint:disable-next-line:triple-equals
    return this.userTypeId == 5;
  }
  get isAssemblyConstituency(){
    // tslint:disable-next-line:triple-equals
    return this.userTypeId == 6;
  }
  get isPollingStationVolunteer(){
    // tslint:disable-next-line:triple-equals
    return this.userTypeId == 7;
  }
  get isBoothVolunteer(){
    // tslint:disable-next-line:triple-equals
    return this.userTypeId == 8;
  }
  get isVolunteer(){
    // tslint:disable-next-line:triple-equals
    return this.userTypeId == 9;
  }
  get isGeneralMember(){
    // tslint:disable-next-line:triple-equals
    return this.userTypeId == 10;
  }

  // get isRefinish(){
  //   // tslint:disable-next-line:triple-equals
  //   return this.userTypeId == 9;
  // }
  // get isPettyCash(){
  //   // tslint:disable-next-line:triple-equals
  //   return this.userTypeId == 10;
  // }


}
