// 1. Structure that should contain array of linked list
// 2. Load factor , at any point of time load factor > 0.5 we rehash
// Java - Hashmap, C++ - unordered_map , python - dict, js - objects
var Node = function(key, value) {
    this.key = key; // key
    this.value = value;
    this.next = null; // until or unless we attach this new node to a list, the next property should be null
}


var MyLinkedList = function() {
    this.head = null; // because initially everything is empty
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(key, val) {
    if(this.head == null) {
        // means the ll is empty, so this node should become the head
        this.head = new Node(key, val);
    } else {
        // when ll is not. empty
        let n = new Node(key,  val);
        n.next = this.head;
        this.head = n;
    }
};

class HashMap {
    constructor() {
        this.lambdaFactorThreshold = 0.5; // threshold lambda factor
        this.maxSize = 2; // how many buckets are avaialable

        this.arr = Array(this.maxSize);

        for(let i = 0; i < this.maxSize; i++) {
            this.arr[i] = new MyLinkedList(); // store empty LL at each index
        }

        this.currSize = 0; // how many elements are inserted
    }

    hashFunction(key) {
        // takes key as a parameter
        // apply the hash function on that key
        // the result of the hashfunction is the bucket index in the given array

        // Suggest any hashfunction for key as a string????

        // "mango": 3,
        // ((ascii(m)*p^0) +  (ascii(a)*p^1) + (ascii(n)*p^2) + (ascii(g)*p^3) .... )%array_size
        // "apple": 5

        // (a + b)%c => (a%c + b%c)%c
        // (a * b)%c => (a%c * b%c)%c

        let ans = 0; // This variable will be the final hashed value
        let p = 101; // prime number to keep
        let pow = 1; // intially power is p^0
        let C = this.maxSize;
        for(let i = 0; i < key.length; i++) {
            // go to each character of given
            let asciiValue = this.ascii(key, i);
            // ans = ((ans%this.currSize) + ((asciiValue%this.currSize)*(pow%this.currSize))%this.currSize) % this.currSize;

            ans = ( (ans%C)+ ((asciiValue%C)*(pow%C))%C ) % C;
            // for next iteration we will incremement the power
            pow = ((pow%C) * p%C)%C;
        }
        return ans;
        /**
         * i = 0, p = 101, pow = 1 (101^0)
         * i = 1, p = 101, pow = 101^1
         * i = 2, p = 101, pow = (101)^2
         */
    }

    ascii(key, index) {
        return key.charCodeAt(index);
    }

    display() {
        for(let i = 0; i < this.arr.length; i++) {
            let temp = this.arr[i].head;
            let str = "LL: ";
            while(temp != null) {
                str += "(" + temp.key + ", " + temp.value  + ") -> ";
                temp = temp.next;
            }
            console.log(str);
        }
        console.log(this.currSize, this.maxSize);
        console.log("*******")
    }

    insert(key, value) {
        // TODO: Implement update part

        let newLoadFactor = (this.currSize + 1) / this.maxSize;
        if(newLoadFactor > this.lambdaFactorThreshold) {
            // if after insertion of new (key, value) pair the load factor will go beyonf the thresold
            // we should first rehash and then insert
            this.rehash(); 
        }

        const bucketIndex = this.hashFunction(key); // hash value generated by the function is the bucket index of the arr only

        this.arr[bucketIndex].addAtHead(key, value);
        this.currSize += 1; // new pair added so size of hashmap increases

    }

    remove(key) {

    }

    search(key) {
        
    }

    rehash() {
        this.maxSize *= 2; // double the capacity of the arr

        const newArr = Array(this.maxSize);// new array with updated capacity

        for(let i = 0; i < this.maxSize; i++) {
            newArr[i] = new MyLinkedList();
        }

        const oldArr = this.arr; 

        // Iterate on each node of every LL and insert them in the newArr

        for(let i = 0; i < oldArr.length; i++) {
            // go to each bucket of old array
            // each bucket has a LL

            let temp = oldArr[i].head;
            while(temp != null) {
                let key = temp.key;
                let value = temp.value;
                

                const bucketIndex = this.hashFunction(key);

                newArr[bucketIndex].addAtHead(key, value);

                temp = temp.next;
            }
        }

        this.arr = newArr;
    }
 }


 const hm = new HashMap();

 hm.insert("mango", 10);
 hm.display();
 hm.insert("banana", 3);
 hm.display();
 hm.insert("apple", 4);
 hm.display();
 hm.insert("grapes", 14);
 hm.display();
 hm.insert("xyz", 14);
 hm.display();