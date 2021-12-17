import React, { useEffect, useState } from 'react';
import { Card, Media, Form, FormControl, Button, Row, Col, Navbar} from 'react-bootstrap';
import api from '../../services/api';
import { Container, CommentPromo, Description, ContainerButton } from '../styles/index';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';


function Dashboard({ data }) {
	const [promotion, setPromotion] = useState(data);
	const [page, setPage] = useState(1);
	async function moreResults() {
		var pageBind = page + 1;		
		const promotions = await api.get('promocoes?page=' + pageBind);

		if (promotions.data.length) {
			var parsed = parsePromotion(promotions.data);
			setPromotion(promotion.concat(parsed));
		}

		setPage(pageBind);
	}

	async function search(e) {
		if (e.key == 'Enter') {			
			e.preventDefault();
			setPromotion([]);
			const promotions = await api.get('promocoes/show?search=' + e.target.value);
			if (promotions.data.length) {
				setPromotion(parsePromotion(promotions.data));
				
			}
			setPage(1);
		}
		
	}
	
	function parsePromotion(promo) {
		const data = promo.map((promotionsMap) => ({
			...promotionsMap,
			timeDistance: formatDistance(
				parseISO(promotionsMap.created_at),
				new Date(),
				{ addSuffix: true, locale: pt }
				),
			}));
			console.log(data);
		return data;
	}
	
	return (
		<div className="base">
			<div>
				<Navbar expand="lg" style={{ backgroundColor: '#efefef', justifyContent: 'center'}}>
					<Navbar.Brand href="#home" style={{ fontFamily: 'auto', height: '45px', fontSize: '24px'}}>Promoção App</Navbar.Brand>
				</Navbar>
			</div>
			<Container>
				<Row>
					<Col>
						<Form className="form-container" style={{display:'flex', marginBottom: '24px'}}>
							<FormControl id="teste" type="text" placeholder="Procurar" onKeyPress={e => search(e)}/>
							{/* <Button className="button-search" variant="outline-success">Criar aviso</Button> */}
						</Form>
					</Col>
				</Row>
				<>
					{ promotion.map( promo => (
						<Card key={promo.id} className="card-container" onClick={()=> window.open(promo.url_monetizada, '_blank')}>
							<Media>
								<Media.Body className="media-body">
								<Row>
									<Col xs={10}>
										<Description>
											<h3>{ promo.descricao }</h3>									
											<p className="price">
												{'R$ ' + promo.preco } 
											</p>
											<CommentPromo>
												{ promo.visible_comment ? promo.first_comment : '' }
											</CommentPromo>
										</Description>
									</Col>
									<Col xs={8}>
										<ContainerButton>
											<Button variant="light">{promo.loja}</Button>
											<span>{promo.timeDistance}</span>
										</ContainerButton>
									</Col>
								</Row>
								</Media.Body>
								<Col xs={4}>
									<img
										width={240}
										height={249}
										className="mr-3"
										src={promo.imagem}
										alt="Imagem"
									/>
								</Col>
							</Media>	
						</Card>
					)) }
				</>
				<Row>
					<Col>
						<Form style={{display:'flex', marginBottom: '24px'}}>
							<FormControl type="button" className="buttonMore mr-sm-2" value="Listar mais" onClick={() => moreResults()}/>
						</Form>
					</Col>
				</Row>
			</Container>
		</div>
	)
}

function parsePromotion2(promo) {
	const data = promo.map((promotionsMap) => ({
		...promotionsMap,
		timeDistance: formatDistance(
			parseISO(promotionsMap.created_at),
			new Date(),
			{ addSuffix: true, locale: pt }
			),
		}));
		
	return data;
}

Dashboard.getInitialProps = async (ctx) => {
	const res = await fetch('http://10.0.0.103:5000/promocoes?page=1');
	const data = await res.json();
	const dataParsed = parsePromotion2(data);
	return { data: dataParsed }
}
export default Dashboard;