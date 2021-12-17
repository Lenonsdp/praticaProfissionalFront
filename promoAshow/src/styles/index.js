import styled from 'styled-components';

export const Container = styled.div`
	heigth: 100vh;

	max-width: 1000px !important;
	margin: 50px auto;
	display: flex;
	flex-direction: column; 
`;
 
export const CommentPromo = styled.p`
	font-size: 26px;
	font-weight: normal;
	color: #948e91;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	text-overflow: ellipsis;
	overflow: hidden;
`;

export const Description = styled.div`
	height: 210px;

	h3 {
		font-size: 26px;
		font-weight: normal;
		color: #948e91;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	p {
		font-family: auto;
		color: #948e91;
	}
`;

export const ContainerButton = styled.div`
	position: relative;
	margin-top: 14px;
	span {
		font-size: 12px;
		color: #948e91;
		margin: 8px;
	}

	@media (max-width: 784px) {
		span {
			font-size: 18px;
		}

		button {
			font-size: 24px;
		}
	}
`;

