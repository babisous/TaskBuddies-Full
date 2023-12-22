import { groupService } from "../../services/groupService";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

const GroupInfos = ({ group }) => {
	const groupSince =
		Math.floor(
			(new Date() - new Date(group.createdAt)) / (1000 * 60 * 60 * 24)
		) + " jours";

	const handleLeave = () => {
		try {
			groupService.leaveGroup(group.id);
			// navigate to /dashboard
			window.location.href = "/dashboard";
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = () => {
		try {
			groupService.deleteGroup(group.id);
			window.location.href = "/dashboard";
		} catch (error) {
			console.log(error);
		}
	};

	const token = localStorage.getItem("token"); // Remplacez 'token' par la clé que vous utilisez pour stocker le token
	const decodedToken = jwt_decode(token);
	const currentUserId = decodedToken.id; // Remplacez 'userId' par la clé que vous utilisez pour stocker l'ID de l'utilisateur dans le token

	const isCreator = group.createdBy.id === currentUserId;

	return (
		<div className="componentContainer">
			<div className="componentHeader">
				<p>Informations du groupe</p>
			</div>
			<div className="bodyContainer">
				<h1>{group.name}</h1>

				<p>Code d'entrée : {group.entryCode}</p>
				<p>Créer il y a : {groupSince}</p>
				{isCreator ? (
					<div className="btnGroup">
						<button
							className="redBtn"
							onClick={() => {
								if (
									window.confirm(
										"Êtes-vous sûr de vouloir supprimer le groupe ?"
									)
								) {
									handleDelete();
								}
							}}
						>
							Supprimer le groupe
						</button>
						<Link to={`/group/${group.id}/settings`}>
							<button>Modifier le groupe</button>
						</Link>
					</div>
				) : (
					<button
						className="redBtn"
						onClick={() => {
							if (
								window.confirm("Êtes-vous sûr de vouloir quitter le groupe ?")
							) {
								handleLeave();
							}
						}}
					>
						Quitter le groupe
					</button>
				)}
			</div>
		</div>
	);
};

export default GroupInfos;
