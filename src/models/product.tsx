
   export default class Product {
    constructor(
      public readonly productId: string,
  
      public readonly imageURL: string,
  
      public readonly name: string,
  
      public readonly price: number,
  
      public readonly description: string,
      public readonly isActive: boolean,
      public readonly category: string

    ) {}
  
 
    static parse(
      data:any
    ): Product | null {
      if (!data) return null
      return new Product(
        data.id,
        data.images[0],
        data.title,
        data.price,
        data.description,
        data.isActive,
        data.category
      )
    }
  }
  