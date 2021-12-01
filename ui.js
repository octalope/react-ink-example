'use strict';
const React = require('react');
const {useRef, useState, useEffect} = require('react');
const {Box, Text, useApp, useInput, useStdout} = require('ink');


const App = () => {
	const {stdout} = useStdout();
	const {exit} = useApp();

	const [width, setWidth] = useState(200);
	const [height, setHeight] = useState(0);

	useRef(() => {
		setWidth(stdout.columns);
		setHeight(stdout.rows);
	}, [stdout.columns, stdout.rows]);

	useEffect(() => {
		const onResize = () => {
			setWidth(stdout.columns);
			setHeight(stdout.rows);
		}

		stdout.on("resize", onResize);

		return () => {
			stdout.off("resize", onResize);
		};
	}, [])

	useInput((input, key) => {
		if (input === 'q') {
			exit();
		}

		if (key.leftArrow) {
			// Left arrow key pressed
		}
	});

	return (
	<Box
	  flexDirection="row"
		width={stdout.columns}
		height={stdout.rows}
		borderStyle="double"
	>
		<Box
			borderStyle="single"
			flexDirection="column"
			width="100%"
		>
			<Box
				borderStyle="single"
				flexDirection="row"
				height="100%"
			>
				<Text>
					Box1A
					{JSON.stringify({width, height}, null, 2)}
				</Text>
			</Box>
			<Box
				borderStyle="single"
				flexDirection="row"
				height="100%"
			>
				<Text>
					Box1B
				</Text>
			</Box>
		</Box>
		<Box
			borderStyle="single"
			flexDirection="row"
			width="100%"
		>
			<Text>
				Box2
			</Text>
		</Box>
		<Box
			borderStyle="single"
			flexDirection="row"
			width="100%"
		>
			<Text>
				Box3
			</Text>
		</Box>
	</Box>
)
};

module.exports = App;
