import React from 'react';
import { Card, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; //Added for navigation
import Box from 'components/Box';
import Typography from 'components/Typography';
import colors from 'assets/theme/base/colors';
import linearGradient from 'assets/theme/functions/linearGradient';

function AutoResolve() {
	const { gradients } = colors;
	const { cardDark, cardContent } = gradients;

	const navigate = useNavigate(); //Initialize navigation hook

	const handleResolve = () => {
		navigate("/ManualOverride"); //Navigate to Manual Override page
	};

	return (
		<Card
			sx={{
				height: '100%',
				position: 'relative',
				background: linearGradient(cardDark.main, cardDark.state, cardDark.deg),
				p: '24px'
			}}
		>
			<Box sx={{ width: '100%' }}>
				{/* Small Alert Icon - top right */}
				<Box
					sx={{
						position: 'absolute',
						top: '20px',
						right: '20px',
						width: '32px',
						height: '32px',
						borderRadius: '50%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					<Typography color='white' fontSize='50px'>
						⚠️
					</Typography>
				</Box>

				{/* Heading */}
				<Box display='flex' alignItems='center' justifyContent='space-between' mb='24px'>
					<Typography variant='lg' color='white' fontWeight='bold'>
						Conflict Resolution
					</Typography>
				</Box>

				{/* Full-width Conflict List Card */}
				<Box
					width='100%'
					p='20px 22px'
					mb='32px'
					sx={{
						background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
						borderRadius: '20px'
					}}
				>
					<Box mb='5px'>
						<Typography color='text' variant='button' fontWeight='bold'>
							List of AI-detected conflicts
						</Typography>
					</Box>
					<Box mb='5px'>
						<Typography color='white' variant='lg' fontWeight='regular'>
							Berth 3: 3 ships for 2 slots
						</Typography>
					</Box>
					<Box mb='5px'>
						<Typography color='white' variant='lg' fontWeight='regular'>
							Berth 6: 2 ships for 4 slots
						</Typography>
					</Box>
				</Box>

				{/* Auto-Resolve Button - bottom right */}
				<Box width='100%' display='flex' justifyContent='flex-end' mt='auto'>
					<Button variant='contained' color='black' fontWeight='bold' onClick={handleResolve}>
						Resolve
					</Button>
				</Box>
			</Box>
		</Card>
	);
}

export default AutoResolve;
