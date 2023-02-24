import { useEffect, useState, useRef } from 'react';

const BinarySearchTree = () => {
    const [root, setRoot] = useState(null);
    const canvasRef = useRef();

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        drawTree();

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        }
    });

    const handleKeyPress = (event) => {
        if (event.code === "Space") {
            const value = Math.floor(Math.random() * 201) - 100;
            addNode(value);
            drawTree();
        }
    };

    const addNode = (value) => {
        const node = { value, left: null, right: null };
        let current = root;
        if (current === null) {
            setRoot(node);
            return;
        }
        while (true) {
            if (value < current.value) {
                if (current.left === null) {
                    current.left = node;
                    return;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = node;
                    return;
                }
                current = current.right;
            }
        }
    };

    const drawTree = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawNode(ctx, root, canvas.width / 2, 30, canvas.width / 2);
    };

    const drawNode = (ctx, node, x, y, parentX) => {
        if (node === null) {
            return;
        }
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillText(node.value.toString(), x - 5, y + 5);
        if (parentX !== undefined) {
            ctx.beginPath();
            ctx.moveTo(parentX, y - 20);
            ctx.lineTo(x, y + 20);
            ctx.stroke();
        }
        drawNode(ctx, node.left, x - 100, y + 40, x);
        drawNode(ctx, node.right, x + 100, y + 40, x);
    };

    return (
        <canvas
            ref={canvasRef}
            width={1500}
            height={850}
            style={{ border: "1px solid black" }}
        />
    );
}

export default BinarySearchTree;