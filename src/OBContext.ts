/**
 * Equivalent to OBContext in openbravo
 */
export default class OBContext {
    private organizationId: string;
    private roleId: string;
    private clientId: string;
    private warehouseId: string;

    constructor(organizationId: string, roleId: string, clientId: string,warehouseId: string) {
        this.organizationId = organizationId;
        this.roleId = roleId;
        this.clientId = clientId;
        this. warehouseId = warehouseId;
    }

    /** Creates a context with the jwtToken information */
    static byJwtToken(jwtToken: string): OBContext {
        //TODO: mejorar esto
        let jwtData = JSON.parse(atob(jwtToken.split(".")[1]));
        return new OBContext(jwtData.organizationId, jwtData.roleId, jwtData.clientId, jwtData.warehouseId);
    }

    getOrganizationId(): string {
        return this.organizationId;
    }

    getRoleId(): string {
        return this.roleId;
    }

    getClientId(): string {
        return this.clientId;
    }

    getWarehouseId(): string {
        return this.warehouseId;
    }
}