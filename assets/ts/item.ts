interface Person {
  firstName: string;
  lastName: string;
}

export class Item {
  constructor(private name:string, private price:number){}
  public say(elem : HTMLElement | null) : void {
    if(!elem){
      return;
    }
    elem.insertAdjacentHTML('beforeend', '書名：' + this.name + '  価格: ' + this.price + '円');
  }
  public greeter(elem : HTMLElement | null, person : Person) {
    elem.insertAdjacentHTML('beforeend', "Hello, " + person.firstName + " " + person.lastName);
  }
}
