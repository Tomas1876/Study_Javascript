interface Stack{
    readonly size:number
    push(value:string):void;
    pop():string;
}

//link의 head를 이용해 구현할 예정
//link는 값을 node로 한 번 감싼다
//이렇게 외부에서 값을 감쌀경우, 그 값은 불변성을 유지하는 것이 좋다
//readonly 추가
type StackNode = {
   readonly value:string;
   readonly next?:StackNode;
}

class StackImpl implements Stack{
    private _size:number = 0;
    private head?:StackNode;
    get size(){
        return this._size
    }
    constructor(private capacity:number){

    }
    push(value:string){    
        if(this.size === this.capacity){
            throw new Error('Stack is full!');
        }
        //새로운 value가 들어오면 그 value를 감싸는 node를 만들어야한다
        const node:StackNode = {value, next:this.head}
        this.head = node;
        this._size++;
    }
    pop():string{
        if(this.head == null){//여기서 undefined로 체크하면 null의 경우 통과한다
                            //null과 undefined는 타입은 다르지만 값은 같다고 간주되므로
                            //=== 대신 ==으로 비교하면 true를 반환
            throw new Error('Stack is empty!');
        }
        const node = this.head;
        this.head = node.next;
        this._size--;
        return node.value;
    }
}

const stack = new StackImpl(5);

stack.push('a');
stack.push('b');
stack.push('c');
while(stack.size !==0){
    console.log(stack.pop());
}