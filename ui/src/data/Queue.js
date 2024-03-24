class Queue {
    constructor() {
        this.items = {};
        this.frontIndex = 0;
        this.backIndex = 0;
    }

    get isEmpty() {
        return this.frontIndex === this.backIndex;
    }

    enqueue(item) {
        this.items[this.backIndex] = item;
        this.backIndex++;
    }

    dequeue() {
        const item = this.items[this.frontIndex];
        delete this.items[this.frontIndex];
        this.frontIndex++;
        return item;
    }

    peek() {
        return this.items[this.frontIndex];
    }

    get printQueue() {
        return this.items;
    }
}

export default Queue;
