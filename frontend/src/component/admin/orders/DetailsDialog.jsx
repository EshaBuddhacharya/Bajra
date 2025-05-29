import { Dialog, Box, Flex, Text, Table, SegmentedControl, Separator } from "@radix-ui/themes";
import { Package, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {useState} from 'react'
import "@radix-ui/themes/styles.css";

export default function DetailsDialog({ isDetailsDialogOpen, setDetailsDialogOpen, selectedOrderDetails }) {
    // State to manage active tab
    const [activeTab, setActiveTab] = useState("items");

    // Animation variants for content
    const contentVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
    };

    return (
        <Dialog.Root open={isDetailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
            <Dialog.Content maxWidth="600px" style={{ padding: "24px", borderRadius: "8px" }}>
                <Dialog.Title style={{ fontSize: "20px", marginBottom: "16px" }}>
                    Order Details
                </Dialog.Title>

                {/* Segmented Control for Tabs */}
                <SegmentedControl.Root
                    defaultValue="items"
                    onValueChange={setActiveTab}
                    style={{ marginBottom: "20px" }}
                >
                    <SegmentedControl.Item value="items">
                        <Flex align="center" gap="2">
                            <Package size={16} />
                            <Text>Order Items</Text>
                        </Flex>
                    </SegmentedControl.Item>
                    <SegmentedControl.Item value="info">
                        <Flex align="center" gap="2">
                            <Info size={16} />
                            <Text>Other Information</Text>
                        </Flex>
                    </SegmentedControl.Item>
                </SegmentedControl.Root>

                <Separator size="4" style={{ margin: "16px 0" }} />

                {/* Animated Content with Layout Animation */}
                <motion.div layout transition={{ duration: 0.15, ease: "easeOut" }}>
                    <AnimatePresence mode="wait">
                        {activeTab === "items" ? (
                            <motion.div
                                key="items"
                                variants={contentVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ duration: 0.15 }}
                            >
                                <Box>
                                    <Table.Root variant="surface">
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.ColumnHeaderCell>Item</Table.ColumnHeaderCell>
                                                <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
                                                <Table.ColumnHeaderCell>Quantity</Table.ColumnHeaderCell>
                                                <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {selectedOrderDetails?.items?.map((item) => (
                                                <Table.Row key={item._id}>
                                                    <Table.Cell>{item.menuItem.name}</Table.Cell>
                                                    <Table.Cell>{item.selectedType.name}</Table.Cell>
                                                    <Table.Cell>{item.quantity}</Table.Cell>
                                                    <Table.Cell>Rs. {item.selectedType.price}</Table.Cell>
                                                </Table.Row>
                                            ))}
                                        </Table.Body>
                                    </Table.Root>
                                    <Flex justify="end" mt="4">
                                        <Text weight="bold">
                                            Total: Rs. {selectedOrderDetails?.total}
                                        </Text>
                                    </Flex>
                                </Box>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="info"
                                variants={contentVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ duration: 0.15 }}
                            >
                                <Box>
                                    <Flex direction="column" gap="3">
                                        <Flex gap="2">
                                            <Text weight="bold">Customer:</Text>
                                            <Text>{selectedOrderDetails?.user?.name}</Text>
                                        </Flex>
                                        <Flex gap="2">
                                            <Text weight="bold">Phone:</Text>
                                            <Text>{selectedOrderDetails?.user?.phone}</Text>
                                        </Flex>
                                        <Flex gap="2">
                                            <Text weight="bold">Delivery Location:</Text>
                                            <Text>{selectedOrderDetails?.deliveryLocation}</Text>
                                        </Flex>
                                        <Flex gap="2">
                                            <Text weight="bold">Additional Instructions:</Text>
                                            <Text>
                                                {selectedOrderDetails?.additionalInstructions || "None"}
                                            </Text>
                                        </Flex>
                                        <Flex gap="2">
                                            <Text weight="bold">Order Status:</Text>
                                            <Text>{selectedOrderDetails?.orderStatus}</Text>
                                        </Flex>
                                        <Flex gap="2">
                                            <Text weight="bold">Order Date:</Text>
                                            <Text>
                                                {new Date(
                                                    selectedOrderDetails?.createdAt
                                                ).toLocaleString()}
                                            </Text>
                                        </Flex>
                                    </Flex>
                                </Box>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </Dialog.Content>
        </Dialog.Root>
    );
}